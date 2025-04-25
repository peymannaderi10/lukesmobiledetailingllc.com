import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// List of all possible booking times
const ALL_TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

// Define a BookingRecord type to use instead of any
interface BookingRecord {
  displayDate?: string;
  displayTime?: string;
  "time#serviceType#customerId"?: string;
  serviceDuration?: number;
  [key: string]: unknown;
}

// Helper function to get time slots that would be occupied by a service
function getOccupiedTimeSlots(startTime: string, duration: number): string[] {
  const startIndex = ALL_TIME_SLOTS.findIndex(time => time === startTime);
  if (startIndex === -1) return [];
  
  // Calculate how many hour slots this service will take
  const slotsNeeded = Math.min(duration, ALL_TIME_SLOTS.length - startIndex);
  
  // Return the occupied time slots
  return ALL_TIME_SLOTS.slice(startIndex, startIndex + slotsNeeded);
}

// Convert time string to a comparable format (hours since 8am)
function timeToHours(timeString: string): number {
  const [hourStr, minutesWithAmPm] = timeString.split(':');
  const amPm = minutesWithAmPm.split(' ')[1];
  
  let hour = parseInt(hourStr);
  
  // Convert to 24-hour format
  if (amPm.toUpperCase() === 'PM' && hour < 12) {
    hour += 12;
  } else if (amPm.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }
  
  // Return hours since 8am (our earliest slot)
  return hour - 8;
}

// Function to extract time from the sort key or use the time field from the booking
function getBookingTime(booking: BookingRecord): string {
  // First try to use the stored displayTime value
  if (booking.displayTime && typeof booking.displayTime === 'string') {
    return booking.displayTime;
  }
  
  // If no displayTime field, try to extract from the sort key
  if (booking["time#serviceType#customerId"] && typeof booking["time#serviceType#customerId"] === 'string') {
    // Sort key format: time#serviceType#customerId
    const parts = booking["time#serviceType#customerId"].split('#');
    if (parts.length >= 1) {
      const timeKey = parts[0];
      // Convert back to formatted time (e.g., "9:00AM" -> "9:00 AM")
      if (timeKey.includes(':')) {
        const hour = timeKey.split(':')[0];
        const minutesWithAmPm = timeKey.split(':')[1];
        if (minutesWithAmPm.endsWith('AM') || minutesWithAmPm.endsWith('PM')) {
          const minutes = minutesWithAmPm.substring(0, 2);
          const amPm = minutesWithAmPm.substring(2);
          return `${hour}:${minutes} ${amPm}`;
        }
      }
    }
  }
  
  // Fallback to first time slot if we can't determine the time
  console.warn(`Could not determine time for booking: ${JSON.stringify(booking)}`);
  return ALL_TIME_SLOTS[0];
}

export async function GET(request: NextRequest) {
  try {
    // Get the date and duration from query parameters
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const duration = parseInt(searchParams.get("duration") || "2"); // Default to 2 hours

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    console.log(`Querying DynamoDB for bookings on date: ${date}`);

    // Query DynamoDB for all bookings on the specified date
    // Using ExpressionAttributeNames to handle the reserved keyword 'date'
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || '',
      KeyConditionExpression: "#dateAttr = :dateValue",
      ExpressionAttributeNames: {
        "#dateAttr": "date"
      },
      ExpressionAttributeValues: {
        ":dateValue": date,
      },
    });

    try {
      const response = await docClient.send(command);
      const bookings = response.Items as BookingRecord[] || [];

      console.log(`Found ${bookings.length} bookings for date ${date}`);

      // Track all occupied time slots based on service durations
      let occupiedTimeSlots: string[] = [];

      // For each booking, find the time slots it will occupy
      bookings.forEach((booking: BookingRecord) => {
        // Get the booking time from either the displayTime field or by parsing the sort key
        const bookingStartTime = getBookingTime(booking);
        const bookingDuration = booking.serviceDuration || 2; // Default to 2 hours if not specified
        
        console.log(`Processing booking: ${booking["time#serviceType#customerId"]}, time: ${bookingStartTime}, duration: ${bookingDuration}`);
        
        // Add all time slots occupied by this booking
        const thisBookingSlots = getOccupiedTimeSlots(bookingStartTime, bookingDuration);
        occupiedTimeSlots = [...occupiedTimeSlots, ...thisBookingSlots];
      });

      // Remove duplicates from occupied slots
      occupiedTimeSlots = [...new Set(occupiedTimeSlots)];

      // Now we need to determine which start times are available
      // A start time is only available if there are enough consecutive slots available after it
      const availableTimes = ALL_TIME_SLOTS.filter(startTime => {
        // Get the time slots needed for the requested service
        const neededSlots = getOccupiedTimeSlots(startTime, duration);
        
        // Check if any of these slots are already occupied
        const conflict = neededSlots.some(slot => occupiedTimeSlots.includes(slot));
        
        // Also check if this would run past our last time slot (4 PM)
        const startHour = timeToHours(startTime);
        const wouldRunPastClosing = startHour + duration > timeToHours(ALL_TIME_SLOTS[ALL_TIME_SLOTS.length - 1]) + 1;
        
        return !conflict && !wouldRunPastClosing;
      });

      return NextResponse.json({
        success: true,
        date,
        duration,
        occupiedTimeSlots,
        availableTimes,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      // If there's an error with DynamoDB, return all time slots as available
      return NextResponse.json({
        success: true,
        date,
        duration,
        occupiedTimeSlots: [],
        availableTimes: ALL_TIME_SLOTS,
        error: "Could not check existing bookings, showing all times as available",
      });
    }
  } catch (error) {
    console.error("Error fetching available times:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch available times" },
      { status: 500 }
    );
  }
} 