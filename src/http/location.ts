import axios from "axios";

export async function getProvincesFn() {
  const response = await axios.get("/api/wilayah/provinces.json");
  return response.data;
}

export async function getRegenciesFn(code: string | number) {
  const response = await axios.get(`/api/wilayah/regencies/${code}.json`);
  return response.data;
}
