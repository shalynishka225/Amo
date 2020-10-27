import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const SelectRegion = (props) => {
  return (
    <Select defaultValue="Виберіть область" style={{ width: "100%" }}>
      {props.data.map((item, index) => {
        return <Option value={item.name + ""} key={index} />;
      })}
    </Select>
  );
};
