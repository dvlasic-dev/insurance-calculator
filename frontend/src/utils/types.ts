export type Discount = {
  _id: string;
  name: string;
  value: number;
  defaultState: false;
};
export type City = {
  _id: string;
  name: string;
  amount: number;
  __v: number;
};
export type UserData = {
  name: string;
  birthdate: Date;
  city: City;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
};
export type Coverage = {
  _id: string;
  name: string;
  value: number;
  defaultState: false;
};
export type Estimate = {
  name: string;
  birthdate: Date;
  vehiclePower: number;
  discounts: {
    commercialDiscount: boolean;
    adviserDiscount: boolean;
    vipDiscount: boolean;
    strongCarSurcharge: boolean;
  };

  coverages: {
    bonusProtection: boolean;
    "ao+": boolean;
    glassProtection: boolean;
  };
  city: {
    _id: string;
    name: string;
    amount: number;
  };
  voucher?: number;
  priceMatch?: number;
  basicPrice: number;
  totalPrice: number;
};

export type PriceMatch = {
  _id: string;
  name: string;
  brithdate: string | Date;
  city: string;
  vehiclePower: number;
  priceMatch: number;
  voucher: number;
  coverages: Array<never | { name: string; value: number }>;
  discountsSurcharges: Array<never | { name: string; value: number }>;
  basePrice: number;
  totalPrice: number;
  createdAt: Date;
};
export type ModalData = {
  open: boolean;
  data: PriceMatch;
  onCloseModal: () => void;
};
