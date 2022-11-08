import React from "react";

import Card from "../../../../UI/Card/Card";
import { Table } from "@mantine/core";
import Spinner from "../../../../UI/Spinner/Spinner";

function ShowDistances(props) {
  console.log("Table Rendered");
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
            <th>Location</th>
            <th>Address</th>
            <th>Time to Drive to</th>
            <th>Frequency</th>
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
