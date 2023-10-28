import { AgeGroup } from "../models/ageGroup";
import { City } from "../models/city";
import { Coverage } from "../models/coverage";
import { Discount } from "../models/discount";
import { AgeGroupT } from "./types";

function calculateAge(dateOfBirth: Date): number {
  const dateNow = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = dateNow.getFullYear() - birthDate.getFullYear();

  // check this year for birthdate
  if (
    dateNow.getMonth() < birthDate.getMonth() ||
    (dateNow.getMonth() === birthDate.getMonth() &&
      dateNow.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function findAgeGroup(arr: Array<AgeGroupT>, age: number) {
  for (let i = 0; i < arr.length; i++) {
    const ageRange = arr[i].age.split("-");
    const minAge = parseInt(ageRange[0]);
    //if age is over 70, set max age to 100
    const maxAge = ageRange[1] === "70+" ? 100 : parseInt(ageRange[1]);

    if (age >= minAge && age <= maxAge) {
      return arr[i];
    }
  }

  // return null if object is not found
  return null;
}

async function calculateBasePrice(cityId: string, age: number) {
  //getting age groups from DB because if values in DB change, this code won't need to change to get correct calculation
  const ageGroups = await AgeGroup.find({});
  const priceFromCity = await City.find({ _id: cityId });
  const priceFromAge = findAgeGroup(ageGroups, age).value;
  const basePrice = priceFromCity[0].amount + priceFromAge;
  return basePrice;
}
async function getCoverages(data, age: number, basePrice: number) {
  //getting coverages from DB because if values in DB change, this code won't need to change to get correct calculation
  const coverages = await Coverage.find({});
  return coverages
    .map((coverage) => {
      if (data.bonusProtection && coverage.name === "Bonus Protection") {
        //calculate bonus protection based on base price
        return { name: coverage.name, value: basePrice * coverage.value };
      } else if (data["ao+"] && coverage.name === "AO+") {
        //depending on age, return either value
        return {
          name: coverage.name,
          value:
            age > 30 ? coverage.value.thirtyPlus : coverage.value.underThirty,
        };
      } else if (data.glassProtection) {
        //calculate glass protection based on vehicle power
        return {
          name: coverage.name,
          value: data.vehiclePower * coverage.value,
        };
      } else return null;
    })
    .filter((coverage) => coverage !== null);
}

async function calcCommercialDiscount(basePrice: number) {
  const commercialDiscount = await Discount.find({
    name: "Commercial discount",
  });
  return basePrice * commercialDiscount[0].value;
}
async function calcStrongCarSurcharge(vehiclePower: number) {
  const strongCarSurcharge = await Discount.find({
    name: "Strong car surcharge",
  });
  return vehiclePower * strongCarSurcharge[0].value;
}
async function calcAdviserDiscount(coveragesPrice: number) {
  const adviserDiscount = await Discount.find({
    name: "Adviser discount",
  });
  return coveragesPrice * adviserDiscount[0].value;
}
async function calcVipDiscount(currentPrice: number) {
  const vipDiscount = await Discount.find({
    name: "VIP discount",
  });
  return currentPrice * vipDiscount[0].value;
}

function calcPriceMatch(
  basePrice: number,
  totalPrice: number,
  priceMatch: number,
  commercialDiscount: number,
  vipDiscount: number,
  coveragesPrice: number,
  adviserDiscount: number,
  strongCarSurcharge: number
) {
  const priceDifference = priceMatch - totalPrice;
  const adjustedBasePrice = basePrice + priceDifference;
  const newTotalPrice =
    adjustedBasePrice -
    commercialDiscount -
    vipDiscount +
    (coveragesPrice - adviserDiscount) +
    strongCarSurcharge;
  return { newTotalPrice, adjustedBasePrice };
}
function checkVoucher(voucher: number, basePrice: number) {
  if (voucher > 0 && voucher < basePrice) {
    return voucher;
  } else return 0;
}
export async function calculateEstimate(data) {
  const age = calculateAge(new Date(data.birthdate));
  const basePrice = await calculateBasePrice(data.city._id, age);
  const coverages = await getCoverages(data, age, basePrice);
  const coveragesTotal: number = coverages.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const commercialDiscount = data.commercialDiscount
    ? await calcCommercialDiscount(basePrice)
    : 0;
  const strongCarSurcharge = data.strongCarSurcharge
    ? await calcStrongCarSurcharge(data.vehiclePower)
    : 0;
  const adviserDiscount = data.adviserDiscount
    ? await calcAdviserDiscount(coveragesTotal)
    : 0;

  //VIP discount is calculated from totalPrice (baseprice & discounts,surcharges,coverages)
  const vipDiscount = data.vipDiscount
    ? await calcVipDiscount(
        basePrice -
          commercialDiscount +
          strongCarSurcharge +
          (coveragesTotal - adviserDiscount)
      )
    : 0;

  const currentTotalPrice =
    basePrice -
    commercialDiscount -
    vipDiscount +
    (coveragesTotal - adviserDiscount) +
    strongCarSurcharge;

  const priceMatch = data.priceMatch
    ? calcPriceMatch(
        basePrice,
        currentTotalPrice,
        data.priceMatch,
        commercialDiscount,
        vipDiscount,
        coveragesTotal,
        adviserDiscount,
        strongCarSurcharge
      )
    : null;
  const finalTotalPrice = priceMatch
    ? priceMatch.newTotalPrice
    : currentTotalPrice;

  const discountsSurcharges = [
    {
      name: "Commercial discount",
      value: commercialDiscount,
    },
    {
      name: "Strong car surcharge",
      value: strongCarSurcharge,
    },
    {
      name: "Adviser discount",
      value: adviserDiscount,
    },
    {
      name: "VIP discount",
      value: vipDiscount,
    },
  ];

  const voucher = checkVoucher(data.voucher, basePrice);
  const priceDetails = {
    name: data.name,
    brithdate: data.birthdate,
    city: data.city.name,
    vehiclePower: data.vehiclePower,
    priceMatch: data.priceMatch ? data.priceMatch : 0,
    voucher,
    coverages,
    discountsSurcharges: discountsSurcharges.filter(
      (discountSurcharge) => discountSurcharge.value > 0
    ),
    basePrice: priceMatch ? priceMatch.adjustedBasePrice : basePrice,
    totalPrice: finalTotalPrice - voucher,
  };

  return priceDetails;
}
