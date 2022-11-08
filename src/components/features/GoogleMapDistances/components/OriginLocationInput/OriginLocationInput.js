import React, { useState } from "react";

import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

function OriginLocationInput(props) {
  const theme = useMantineTheme();

  const inputHandler = (event) => {
    props.setInput(event.target.value);
  };

  return (
    <TextInput
      value={props.input}
      onChange={inputHandler}
      className={props.className}
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      placeholder="Enter an Origin Location!"
      rightSectionWidth={42}
    />
  );
}

export default OriginLocationInput;
/*
rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      */
