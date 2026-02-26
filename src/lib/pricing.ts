export const SERVICES = {
  signature:    { name: 'The Signature',     description: 'Interior & Exterior Detail', baseDuration: 4.0 },
  diamond:      { name: 'The Diamond',       description: 'Interior & Exterior Detail', baseDuration: 5.5 },
  basic:        { name: 'The Basic',         description: 'Interior & Exterior Detail', baseDuration: 2.5 },
  fullinterior: { name: 'The Full Interior', description: 'Interior Detail Only',       baseDuration: 3.0 },
  fullexterior: { name: 'The Full Exterior', description: 'Exterior Detail Only',       baseDuration: 2.0 },
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const VEHICLES = {
  sedan:     { name: 'Sedan / Coupe',      multiplier: 1.00 },
  hatchback: { name: 'Hatchback / Wagon',  multiplier: 1.00 },
  suv:       { name: 'SUV / Crossover',    multiplier: 1.15 },
  truck:     { name: 'Pickup Truck',       multiplier: 1.20 },
  xl:        { name: 'XL SUV / Van',       multiplier: 1.35 },
} as const;

export type VehicleKey = keyof typeof VEHICLES;

export const CONDITIONS = {
  clean:  { name: 'Clean',          description: 'Regularly maintained, light everyday dirt' },
  dirty:  { name: 'Somewhat Dirty', description: "Noticeable buildup, hasn't been cleaned in a while" },
  filthy: { name: 'Filthy',         description: 'Heavy dirt, odors, stains, or long-term neglect' },
} as const;

export type ConditionKey = keyof typeof CONDITIONS;

/** Price matrix: service -> vehicle -> condition -> price. hatchback uses sedan prices. */
const PRICE_MATRIX: Record<ServiceKey, Record<Exclude<VehicleKey, 'hatchback'>, Record<ConditionKey, number>>> = {
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
    sedan: { clean: 150, dirty: 195, filthy: 195 },
    suv:   { clean: 155, dirty: 225, filthy: 225 },
    truck: { clean: 165, dirty: 235, filthy: 235 },
    xl:    { clean: 195, dirty: 275, filthy: 275 },
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
  const vehicle = vehicleKey === 'hatchback' ? 'sedan' : vehicleKey;
  return PRICE_MATRIX[serviceKey][vehicle][conditionKey];
}

export function calculateQuote(params: {
  serviceKey: ServiceKey;
  vehicleKey: VehicleKey;
  conditionKey: ConditionKey;
  addonKeys: AddonKey[];
}) {
  const service = SERVICES[params.serviceKey];
  const basePrice = getBasePrice(params.serviceKey, params.vehicleKey, params.conditionKey);
  const vMult = VEHICLES[params.vehicleKey].multiplier;
  const addons = params.addonKeys.map(k => ADDONS[k]);

  const addonTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const addonDur = addons.reduce((sum, a) => sum + a.duration, 0);

  return {
    totalPrice: basePrice + addonTotal,
    durationHours: +(service.baseDuration * vMult + addonDur).toFixed(1),
    breakdown: {
      base: basePrice,
      vehicleAdj: 0,
      conditionAdj: 0,
      addonTotal,
    },
  };
}
