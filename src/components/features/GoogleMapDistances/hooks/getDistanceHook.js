async function getDistanceHook(origin, destination) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_MAPS_API_DIRECTIONS_URL;

  const fullUrl = `http://localhost:8080/${url}?origin=${origin}&destination=${destination}&key=${apiKey}`;

  //?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY
  // Paragon: Ei04NTU4IFMgMTMwMCBFIHN1aXRlIDEwMSwgU2FuZHksIFVUIDg0MDk0LCBVU0EiJRojChYKFAoSCQHXeoSoYlKHEbQqq90Ig8i3EglzdWl0ZSAxMDE

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
    });

    if (!res.ok) {
      const resBody = await res.json();
      const errMsg = resBody.error.message;
      throw new Error(errMsg);
    }

    const resBody = await res.json();
    if (resBody.routes[0].legs[0])
      return resBody.routes[0].legs[0].duration.text;
    return false;
  } catch (err) {
    alert(err);
    throw Error(err);
  }
}

export default getDistanceHook;
