import { GOOGLE_MAPS_API_SEARCHNEARBY_URL } from "../../../library/googleMapsAPIUrls";

async function searchNearbyHook(origin, keyword) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = GOOGLE_MAPS_API_SEARCHNEARBY_URL;
  const cors = process.env.REACT_APP_CORS_URL
    ? process.env.REACT_APP_CORS_URL
    : "";

  // const fullUrl = `${cors}${url}?keyword=${keyword}&location=${origin}&rankby=distance&key=${apiKey}`;
  const fullUrl = `${url}?keyword=${keyword}&location=${origin}&rankby=distance&key=${apiKey}`;

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

    if (resBody.results[0].place_id)
      return `place_id:${resBody.results[0].place_id}`;
    return false;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default searchNearbyHook;
