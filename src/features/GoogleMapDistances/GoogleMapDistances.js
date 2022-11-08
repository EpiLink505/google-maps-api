import React, { useState } from "react";
import styles from "./GoogleMapDistances.module.css";

import { elements, blankObj } from "./locations";
import GetDistanceBtn from "./components/GetDistanceBtn/GetDistanceBtn";
import ShowDistances from "./components/ShowDistances/ShowDistances";
import OriginLocationInput from "./components/OriginLocationInput/OriginLocationInput";

import getDistanceHook from "./hooks/getDistanceHook";
import getPlaceIdHook from "./hooks/getPlaceIdHook";
import searchNearbyHook from "./hooks/searchNearbyHook";
import getAddressFromPlaceId from "./hooks/getAddressFromPlaceId";

const elements2 = [
  {
    name: "Cupbop - Korean BBQ in a Cup",
    address: "",
    distance: "--",
    frequency: 1,
  },
];

function GoogleMapDistances() {
  const [distancesTableObj, setDistancesTableObj] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const getDistanceHandler = async () => {
    setIsLoading(true);
    const origin = await getPlaceIdHook(input);
    const originPID = origin.placeId;
    const originLatLng = origin.latLng;

    //718 E Sandy Point Dr, Sandy, UT 84094
    //4769 Settlers Way, Taylorsville, UT 84123

    const tableItems = await Promise.all(
      elements.map(async (loc) => {
        let curLocPlaceId;
        let curAddress = "";
        if (!loc.address) {
          curLocPlaceId = await searchNearbyHook(originLatLng, loc.name);
          curAddress = await getAddressFromPlaceId(curLocPlaceId);
        } else {
          const temp = await getPlaceIdHook(loc.address);
          curLocPlaceId = temp.placeId;
        }
        if (!curLocPlaceId) return blankObj;

        const distance = await getDistanceHook(originPID, curLocPlaceId);
        if (!distance) return blankObj;
        const item = {
          ...loc,
          address: curAddress ? curAddress : loc.address,
          distance: distance,
        };
        return item;
      })
    );

    setDistancesTableObj(tableItems);
    setIsLoading(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    getDistanceHandler();
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <OriginLocationInput
          input={input}
          setInput={setInput}
          className={styles["originLocationInput"]}
        />
        <GetDistanceBtn getDistance={getDistanceHandler} />
      </form>
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
