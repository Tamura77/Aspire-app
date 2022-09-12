import { instance } from ".";

export async function fetchExample () {
  const { data } = await instance.get("/");
  return data;
}

