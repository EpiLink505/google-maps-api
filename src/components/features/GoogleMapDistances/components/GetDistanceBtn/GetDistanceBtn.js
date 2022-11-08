import React from "react";

import Button from "../../../../UI/Button/Button";

function GetDistanceBtn(props) {
  const clickHandler = () => {
    props.getDistance();
  };

  return <Button text={"Get Distance!"} onClick={clickHandler} />;
}

export default GetDistanceBtn;
