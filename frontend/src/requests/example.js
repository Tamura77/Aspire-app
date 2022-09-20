import { instance } from ".";

export async function getMapData () {
  const { data } = await instance.get("/maps");
  return data;
}

