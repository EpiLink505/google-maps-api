import React, { useState } from "react";
import styles from "./GoogleMapDistances.module.css";

import { elements, blankObj } from "./locations";
import GetDistanceBtn from "./components/GetDistanceBtn/GetDistanceBtn";
import ShowDistances from "./components/ShowDistances/ShowDistances";
import OriginLocationInput from "./components/OriginLocationInput/OriginLocationInput";

import getDistanceHook from "./hooks/getDistanceHook";
import getPlaceIdHook from "./hooks/getPlaceIdHook";

function GoogleMapDistances() {
  const [distancesTableObj, setDistancesTableObj] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const getDistanceHandler = async () => {
    setIsLoading(true);
    const originPID = await getPlaceIdHook(input);

    const tableItems = await Promise.all(
      elements.map(async (loc) => {
        const curLocPlaceId = await getPlaceIdHook(loc.address);
        if (!curLocPlaceId) return blankObj;
        const distance = await getDistanceHook(originPID, curLocPlaceId);
        if (!distance) return blankObj;
        const item = {
          ...loc,
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
    console.log(input);
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
