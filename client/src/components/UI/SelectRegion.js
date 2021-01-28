import { Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

export const SelectRegion = (props) => {
  const [region, setRegion] = useState(props.fetchedRegion);
  const handleChangeRegion = (value) => {
    setRegion(value);
  };

  const handleChangeLocality = (value) => {
    props.region(region);
    props.locality(value);
  };

  return (
    <>
      <Select
        defaultValue={
          props.fetchedRegion !== null
            ? props.fetchedRegion
            : "Виберіть область"
        }
        style={{ width: "100%" }}
        onChange={handleChangeRegion}
      >
        {props.data.map((item) => {
          return (
            <Option value={item.name} key={item.id}>
              {item.name}
            </Option>
          );
        })}
      </Select>

      {region !== null || props.fetchedLocality != null ? (
        <Select
          defaultValue={
            props.fetchedLocality !== null
              ? props.fetchedLocality
              : "Виберіть населений пункт"
          }
          style={{ width: "100%" }}
          onChange={handleChangeLocality}
        >
          {props.data.map((item) => {
            if (item.name === region) {
              return item.areas.map((area) => {
                return (
                  <Option value={area.name} key={area.id}>
                    {area.name}
                  </Option>
                );
              });
            }
          })}
        </Select>
      ) : null}
    </>
  );
};
