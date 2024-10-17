import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const CourtsGuage = ({value,valueMax}) => {
  return (
    <>
      <Gauge
        value={value}
        valueMax={valueMax}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </>
  );
};

export default CourtsGuage;
