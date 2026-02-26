export const SERVICES = {
  signature:    { name: 'The Signature',     description: 'Interior & Exterior Detail', baseDuration: 4.0 },
  diamond:      { name: 'The Diamond',       description: 'Interior & Exterior Detail', baseDuration: 5.5 },
  basic:        { name: 'The Basic',         description: 'Interior & Exterior Detail', baseDuration: 2.5 },
  fullinterior: { name: 'The Full Interior', description: 'Interior Detail Only',       baseDuration: 3.0 },
  fullexterior: { name: 'The Full Exterior', description: 'Exterior Detail Only',       baseDuration: 2.0 },
} as const;

/** What's included per service - shown in booking step 2 and homepage package cards */
export const SERVICE_INCLUDES: Record<keyof typeof SERVICES, {
  interior?: string[];
  exterior?: string[];
  items?: string[]; // for single-focus services (fullinterior, fullexterior)
}> = {
  signature: {
    interior: [
      'Full interior deep vacuum',
      'Wipe down of all surfaces',
      'Steam cleaning of cracks & crevices vinyl',
      'Inside screens windows',
      'Application of P&S interior UV protectant',
      'Final touch up\'s & vacuum',
      'Air freshener',
    ],
    exterior: [
      'Full vehicle pre rinse',
      'Foam wash',
      'Wheels & wheel wells',
      'Tires',
      'Paint decontamination',
      'Full dry down & light polish',
      'Windows',
      'Tire shine',
      '6-8 month sealant',
    ],
  },
  diamond: {
    interior: [
      'Full interior deep vacuum',
      'Wipe down of all surfaces',
      'Heated shampoo extraction of seats and carpets',
      'Steam cleaning of cracks & crevices vinyl',
      'Inside screens windows',
      'Application of P&S interior UV protectant',
      'Leather and vinyl conditioning',
      'Final touch up\'s & vacuum',
      'Air freshener',
    ],
    exterior: [
      'Full vehicle pre rinse',
      'Foam wash',
      'Wheels & wheel wells',
      'Tires',
      'Paint decontamination',
      'Undercarriage wash',
      'Clay bar treatment',
      'Machine applied ceramic infused wax',
      'Full dry down & light polish',
      'Windows',
      'Tire shine',
    ],
  },
  basic: {
    interior: [
      'Full interior vacuum',
      'Wipe down of all surfaces',
      'Inside screens windows',
      'Air freshener',
    ],
    exterior: [
      'Foam wash',
      'Wheels cleaned',
      'Tires',
      'Full dry down',
      'Windows',
      'Tire shine',
    ],
  },
  fullinterior: {
    items: [
      'Full interior deep vacuum',
      'Wipe down of all surfaces',
      'Steam cleaning of cup holders, vinyl, air vents & floor mats',
      'Inside screens windows',
      'Application of P&S interior UV protectant',
      'Final touch up\'s & double vacuum',
      'Air freshener & business card to finish it off!',
    ],
  },
  fullexterior: {
    items: [
      'Rinse of entire car/truck',
      'Foam wash',
      'Wheels & tires',
      'Bug/road debris removed',
      'Paint decontamination',
      'Drying of entire vehicle',
      'Windows cleaned',
      'Steam cleaning of wheel wells & rims',
      '6-8 month sealant',
    ],
  },
};

export type ServiceKey = keyof typeof SERVICES;

export const VEHICLES = {
  sedan: { name: 'Sedan / Coupe' },
  suv:   { name: 'SUV / Compact Pick Up' },
  truck: { name: 'Midsize Pick Up' },
  xl:    { name: 'Heavy Duty Pick Up / Van' },
} as const;

export type VehicleKey = keyof typeof VEHICLES;

export const CONDITIONS = {
  clean:  { name: 'Clean',          description: 'Regularly maintained, light everyday dirt' },
  dirty:  { name: 'Somewhat Dirty', description: "Noticeable buildup, hasn't been cleaned in a while" },
  filthy: { name: 'Filthy',         description: 'Heavy dirt, odors, stains, or long-term neglect' },
} as const;

export type ConditionKey = keyof typeof CONDITIONS;

/** Price matrix: service -> vehicle -> condition -> price. Basic has no filthy tier; dirty used as fallback. */
const PRICE_MATRIX: Record<ServiceKey, Record<VehicleKey, Partial<Record<ConditionKey, number>>>> = {
  signature: {
    sedan: { clean: 230, dirty: 260, filthy: 330 },
    suv:   { clean: 245, dirty: 275, filthy: 345 },
    truck: { clean: 250, dirty: 290, filthy: 380 },
    xl:    { clean: 250, dirty: 295, filthy: 395 },
  },
  diamond: {
    sedan: { clean: 395, dirty: 450, filthy: 550 },
    suv:   { clean: 395, dirty: 470, filthy: 570 },
    truck: { clean: 395, dirty: 480, filthy: 580 },
    xl:    { clean: 425, dirty: 495, filthy: 595 },
  },
  fullinterior: {
    sedan: { clean: 185, dirty: 225, filthy: 295 },
    suv:   { clean: 195, dirty: 235, filthy: 295 },
    truck: { clean: 195, dirty: 250, filthy: 325 },
    xl:    { clean: 235, dirty: 260, filthy: 395 },
  },
  fullexterior: {
    sedan: { clean: 90,  dirty: 115, filthy: 165 },
    suv:   { clean: 95,  dirty: 120, filthy: 170 },
    truck: { clean: 95,  dirty: 135, filthy: 185 },
    xl:    { clean: 135, dirty: 175, filthy: 195 },
  },
  basic: {
    sedan: { clean: 150, dirty: 195 },
    suv:   { clean: 155, dirty: 225 },
    truck: { clean: 165, dirty: 235 },
    xl:    { clean: 195, dirty: 275 },
  },
};

export const ADDONS = {
  pethair:       { label: 'Pet Hair Removal',              price: 50,  duration: 0.5 },
  odor:          { label: 'Odor Elimination',              price: 60,  duration: 0.5 },
  enginebay:     { label: 'Engine Bay Clean',              price: 80,  duration: 1.0 },
  headlights:    { label: 'Headlight Restoration',         price: 45,  duration: 0.5 },
  scratch:       { label: 'Light Scratch Removal',        price: 90,  duration: 1.0 },
  carpetshampoo: { label: 'Carpet Shampooing',             price: 75,  duration: 1.5 },
  leather:       { label: 'Leather Restoration',            price: 75,  duration: 1.5 },
  dentrepair:    { label: 'Dent Repair',                   price: 75,  duration: 1.5 },
  fullwax:       { label: 'Full Wax & Light Polish',       price: 55,  duration: 0.5 },
  ceramicwindows: { label: '3 Year Ceramic Coating (Windows)', price: 150, duration: 2.5 },
  undercarriage: { label: 'Undercarriage + Engine Bay + Wash', price: 100, duration: 2.5 },
} as const;

export type AddonKey = keyof typeof ADDONS;

function getBasePrice(serviceKey: ServiceKey, vehicleKey: VehicleKey, conditionKey: ConditionKey): number {
  const matrix = PRICE_MATRIX[serviceKey][vehicleKey];
  return (matrix[conditionKey] ?? matrix.dirty ?? matrix.clean ?? 0) as number;
}

export function calculateQuote(params: {
  serviceKey: ServiceKey;
  vehicleKey: VehicleKey;
  conditionKey: ConditionKey;
  addonKeys: AddonKey[];
}) {
  const service = SERVICES[params.serviceKey];
  const basePrice = getBasePrice(params.serviceKey, params.vehicleKey, params.conditionKey);
  const addons = params.addonKeys.map(k => ADDONS[k]);

  const addonTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const addonDur = addons.reduce((sum, a) => sum + a.duration, 0);

  return {
    totalPrice: basePrice + addonTotal,
    durationHours: +(service.baseDuration + addonDur).toFixed(1),
    breakdown: {
      base: basePrice,
      vehicleAdj: 0,
      conditionAdj: 0,
      addonTotal,
    },
  };
}
