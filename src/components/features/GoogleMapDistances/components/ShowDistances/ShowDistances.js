import React from "react";
import styles from "./ShowDistances.module.css";

import Card from "../../../../UI/Card/Card";
import { Table } from "@mantine/core";
import Spinner from "../../../../UI/Spinner/Spinner";

function ShowDistances(props) {
  const elements = props.distancesTableObj;

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.location}</td>
      <td>{element.address}</td>
      <td>{element.distance}</td>
      <td>{element.frequency}</td>
    </tr>
  ));

  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th id={styles.locationHeader}>Location</th>
            <th id={styles.locationHeader}>Address</th>
            <th id={styles.locationHeader}>Time to Drive to</th>
            <th id={styles.locationHeader}>Frequency</th>
          </tr>
        </thead>
        {!props.isLoading && <tbody>{rows}</tbody>}
      </Table>
      {props.isLoading && <Spinner />}
    </Card>
  );
}

export default ShowDistances;
/*
<h1>Show Distances</h1>
        <p>{from}</p>
        <p>{to}</p>
        <p>{`Duration: ${duration}`}</p>*/
