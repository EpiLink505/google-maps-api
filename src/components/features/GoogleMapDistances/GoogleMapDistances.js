import React, { useState } from "react";

import GetDistanceBtn from "./components/GetDistanceBtn/GetDistanceBtn";
import ShowDistances from "./components/ShowDistances/ShowDistances";

import getDistanceHook from "./hooks/getDistanceHook";
import getPlaceIdHook from "./hooks/getPlaceIdHook";

const elements = [
  {
    name: "Home",
    location: "Home",
    address: "4769 Settlers Way, Taylorsville UT 94123",
    distance: "---",
  },
  {
    name: "Paragon City Gaming",
    location: "Paragon City Gaming",
    address: "8558 S 1300 E suite 101, Sandy UT 84094",
    distance: "--",
    frequency: 6,
  },
  {
    name: "Greg's House",
    location: "Greg's House",
    address: "6072 S 700 W, Murray, UT 84123",
    distance: "--",
    frequency: 2,
  },
];

function GoogleMapDistances() {
  const [distancesTableObj, setDistancesTableObj] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const origin = "4769 Settlers Way, Taylorsville UT 84123";

  const getDistanceHandler = async () => {
    setIsLoading(true);
    const originPID = await getPlaceIdHook(origin);

    const tableItems = elements.map(async (loc) => {
      const curLocPlaceId = await getPlaceIdHook(loc.address);
      const distance = await getDistanceHook(originPID, curLocPlaceId);
      const item = {
        ...loc,
        distance: distance,
      };
      return item;
    });

    setIsLoading(false);
  };

  return (
    <>
      <GetDistanceBtn getDistance={getDistanceHandler} />
      <ShowDistances
        origin={origin}
        distancesTableObj={distancesTableObj}
        isLoading={isLoading}
      />
    </>
  );
}

export default GoogleMapDistances;

/*
 // const destinationPID = await getPlaceIdHook(destination);
// const distance = await getDistanceHook(originPID, destinationPID);
const tableItems = elements.map((loc) => {
      getPlaceIdHook(loc.address)
        .then((curLocPlaceId) => {
          return getDistanceHook(originPID, curLocPlaceId);
        })
        .then((distance) => {
          const item = {
            ...loc,
            distance: distance,
          };
          return item;
        });
    });
*/
