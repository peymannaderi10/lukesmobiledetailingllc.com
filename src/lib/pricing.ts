export const SERVICES = {
  signature:    { name: 'The Signature',     description: 'Interior & Exterior Detail', basePrice: 260, baseDuration: 4.0 },
  diamond:      { name: 'The Diamond',       description: 'Interior & Exterior Detail', basePrice: 495, baseDuration: 5.5 },
  basic:        { name: 'The Basic',         description: 'Interior & Exterior Detail', basePrice: 190, baseDuration: 2.5 },
  fullinterior: { name: 'The Full Interior', description: 'Interior Detail Only',       basePrice: 200, baseDuration: 3.0 },
  fullexterior: { name: 'The Full Exterior', description: 'Exterior Detail Only',       basePrice: 135, baseDuration: 2.0 },
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
  clean:  { name: 'Clean',          description: 'Regularly maintained, light everyday dirt',          multiplier: 1.00 },
  dirty:  { name: 'Somewhat Dirty', description: "Noticeable buildup, hasn't been cleaned in a while", multiplier: 1.20 },
  filthy: { name: 'Filthy',         description: 'Heavy dirt, odors, stains, or long-term neglect',    multiplier: 1.45 },
} as const;

export type ConditionKey = keyof typeof CONDITIONS;

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

export function calculateQuote(params: {
  serviceKey: ServiceKey;
  vehicleKey: VehicleKey;
  conditionKey: ConditionKey;
  addonKeys: AddonKey[];
}) {
  const service = SERVICES[params.serviceKey];
  const vMult   = VEHICLES[params.vehicleKey].multiplier;
  const cMult   = CONDITIONS[params.conditionKey].multiplier;
  const addons  = params.addonKeys.map(k => ADDONS[k]);

  const vehicleAdj   = Math.round(service.basePrice * vMult);
  const conditionAdj = Math.round(vehicleAdj * cMult);
  const addonTotal   = addons.reduce((sum, a) => sum + a.price, 0);
  const addonDur     = addons.reduce((sum, a) => sum + a.duration, 0);

  return {
    totalPrice:    conditionAdj + addonTotal,
    durationHours: +(service.baseDuration * vMult + addonDur).toFixed(1),
    breakdown: {
      base:         service.basePrice,
      vehicleAdj:   vehicleAdj - service.basePrice,
      conditionAdj: conditionAdj - vehicleAdj,
      addonTotal,
    },
  };
}
