import formatAddress from "../../../../helpers/formatAddress";

async function getPlaceIdHook(address) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_MAPS_API_PLACEID_URL;
  const fields = "formatted_address,place_id";
  const formattedAddress = formatAddress(address);

  const fullUrl = `http://localhost:8080/${url}?fields=${fields}&input=${formattedAddress}&inputtype=textquery&key=${apiKey}`;

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

    if (resBody.candidates[0]) {
      const placeId = `place_id:${resBody.candidates[0].place_id}`;
      return placeId;
    }
    return false;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default getPlaceIdHook;
