async function getPlaceIdHook(address) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_MAPS_API_PLACEID_URL;
  const fields = "formatted_address,place_id";

  const fullUrl = `http://localhost:8080/${url}?fields=${fields}&input=${address}&inputtype=textquery&key=${apiKey}`;

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

    const placeId = `place_id:${resBody.candidates[0].place_id}`;
    return placeId;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default getPlaceIdHook;
