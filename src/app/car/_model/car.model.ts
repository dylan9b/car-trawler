export type CarModel = CarItemModel[];

export interface CarItemModel {
  vehAvailRSCore: VehAvailRscore;
}

export interface VehAvailRscore {
  vehRentalCore: VehRentalCore;
  vehVendorAvails: VehVendorAvail[];
}

export interface VehRentalCore {
  pickUpDateTime: string;
  returnDateTime: string;
  pickUpLocation: PickUpLocation;
  returnLocation: ReturnLocation;
}

export interface PickUpLocation {
  name: string;
}

export interface ReturnLocation {
  name: string;
}

export interface VehVendorAvail {
  vendor: Vendor;
  vehAvails: VehAvail[];
}

export interface Vendor {
  code: string;
  name: string;
}

export interface VehAvail {
  status: string;
  vehicle: Vehicle;
  totalCharge: TotalCharge;
}

export interface Vehicle {
  airConditionInd: string;
  transmissionType: string;
  fuelType: string;
  driveType: string;
  passengerQuantity: string;
  baggageQuantity: string;
  code: string;
  codeContext: string;
  doorCount: string;
  vehMakeModel: VehMakeModel;
  pictureURL: string;
  size?: string;
}

export interface VehMakeModel {
  name: string;
}

export interface TotalCharge {
  rateTotalAmount: string;
  estimatedTotalAmount: string;
  currencyCode: string;
}
