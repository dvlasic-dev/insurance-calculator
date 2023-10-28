import { City, Coverage, Discount, PriceMatch, UserData } from "./types";

async function fetchPost<T, T2>(url: string, body: T): Promise<T2> {
  const response = await window.fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  const data: T2 = await response.json();
  if (response.ok) {
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error(`No data found"`));
    }
  } else {
    const error = new Error("Error has occurred");
    return Promise.reject(error);
  }
}
async function fetchGet<T>(url: string): Promise<Array<T>> {
  const response = await window.fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
  const data: Array<T> = await response.json();

  if (response.ok) {
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error(`No data found"`));
    }
  } else {
    const error = new Error("Error has occurred");
    return Promise.reject(error);
  }
}
export const getDiscounts = async () => {
  return await fetchGet<Discount>(
    `${import.meta.env.VITE_BACKEND_URL}api/discount/`,
  );
};
export const getCoverages = async () => {
  return await fetchGet<Coverage>(
    `${import.meta.env.VITE_BACKEND_URL}api/coverage/`,
  );
};
export const getCities = async () => {
  //add label and value to city object of cities needed for Select component
  return await fetchGet<City>(
    `${import.meta.env.VITE_BACKEND_URL}api/city/`,
  ).then((cities) =>
    cities.map((city) => ({ label: city.name, value: city._id, ...city })),
  );
};
export const getEstimates = async () => {
  return await fetchGet<PriceMatch>(
    `${import.meta.env.VITE_BACKEND_URL}api/estimate/`,
  );
};

export const getInsuranceEstimate = async (
  url: string,
  body: UserData,
): Promise<PriceMatch> => {
  return await fetchPost<UserData, PriceMatch>(url, body);
};
