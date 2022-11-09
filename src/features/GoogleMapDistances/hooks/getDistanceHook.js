import { GOOGLE_MAPS_API_DIRECTIONS_URL } from "../../../library/googleMapsAPIUrls";

async function getDistanceHook(origin, destination) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = GOOGLE_MAPS_API_DIRECTIONS_URL;
  const cors = process.env.REACT_APP_CORS_URL
    ? process.env.REACT_APP_CORS_URL
    : "";

  // console.log(origin, destination);

  // const fullUrl = `${cors}${url}?origin=${origin}&destination=${destination}&key=${apiKey}`;
  const fullUrl = `/cors-proxy/${url}?origin=${origin}&destination=${destination}&key=${apiKey}`;

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
    if (resBody?.routes[0]?.legs[0])
      return resBody.routes[0].legs[0].duration.text;
    return false;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default getDistanceHook;
