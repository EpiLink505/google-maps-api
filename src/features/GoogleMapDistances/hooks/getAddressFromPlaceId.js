import { GOOGLE_MAPS_API_PLACE_URL } from "../../../library/googleMapsAPIUrls";

async function getAddressFromPlaceId(placeId) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = GOOGLE_MAPS_API_PLACE_URL;
  const fields = "name,formatted_address";
  const cors = process.env.REACT_APP_CORS_URL
    ? process.env.REACT_APP_CORS_URL
    : "";

  let formattedPlaceId = placeId;
  if (formattedPlaceId.includes("place_id:")) {
    formattedPlaceId = formattedPlaceId.replace("place_id:", "");
  }

  // const fullUrl = `${cors}${url}?fields=${fields}&place_id=${formattedPlaceId}&key=${apiKey}`;
  const fullUrl = `${url}?fields=${fields}&place_id=${formattedPlaceId}&key=${apiKey}`;

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const resBody = await res.json();
      const errMsg = resBody.error.message;
      throw new Error(errMsg);
    }

    const resBody = await res.json();

    if (resBody.result.formatted_address)
      return resBody.result.formatted_address;
    return false;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default getAddressFromPlaceId;
