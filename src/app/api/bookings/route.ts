import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Generate a unique customer ID for the sort key
    const customerId = uuidv4(); 
    const dateTime = new Date().toISOString();
    
    // Format the time for the sort key
    const timeKey = data.time.replace(/\s+/g, ''); // Remove spaces from time (e.g. "9:00 AM" -> "9:00AM")
    const serviceType = data.package || 'Basic';
    
    // Structure the data for DynamoDB
    const bookingItem = {
      // Use 'date' as the partition key to match DynamoDB table structure
      date: data.date,
      // Use the exact attribute name 'time#serviceType#customerId' for the sort key
      "time#serviceType#customerId": `${timeKey}#${serviceType}#${customerId}`,
      
      // Add display fields for readability
      displayDate: data.date,
      displayTime: data.time,

      // Booking details
      bookingId: customerId,
      packageName: data.package,
      packagePrice: data.packagePrice,
      serviceDuration: data.serviceDuration || 2, // Add service duration (default 2 hours)
      
      // Customer info
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      
      // Vehicle info
      vehicleType: data.vehicleType,
      vehicleYear: data.vehicleYear,
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleColor: data.vehicleColor,
      
      // Address
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      
      // Additional info
      additionalServices: data.additionalServices || [],
      notes: data.notes || "",
      
      // Payment info
      paymentIntentId: data.paymentIntentId || null,
      paymentType: data.paymentType || "full",
      amountPaid: data.amountPaid || 0,
      remainingBalance: data.remainingBalance || 0,
      
      // Metadata
      createdAt: dateTime,
      updatedAt: dateTime,
      status: "confirmed"
    };

    console.log(`Storing booking in DynamoDB. Date: ${data.date}, Sort key: ${timeKey}#${serviceType}#${customerId}`);

    // Store the booking in DynamoDB
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || '',
      Item: bookingItem,
    });

    try {
      await docClient.send(command);
      
      console.log(`Successfully stored booking with ID ${customerId} in DynamoDB`);

      return NextResponse.json(
        { success: true, bookingId: customerId },
        { status: 201 }
      );
    } catch (dbError) {
      console.error(`DynamoDB error storing booking: ${dbError}`);
      return NextResponse.json(
        { success: false, error: "Database error: Failed to save booking", details: String(dbError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing booking request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process booking request" },
      { status: 500 }
    );
  }
} 