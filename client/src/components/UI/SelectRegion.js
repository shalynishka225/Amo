import { Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

export const SelectRegion = (props) => {
  const [region, setRegion] = useState(null);
  const [locality, setLocality] = useState(null);

  const handleChangeRegion = (value) => {
    setRegion(value);
    props.region(value);
    //console.log(encodeURI(value));
  };

  const handleChangeLocality = (value) => {
    setLocality(value)
    props.locality(value);
  };

  return (
    <>
      <Select
        defaultValue={
            region
            ? region
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

      {region ? (
        <Select
          defaultValue={
            locality
              ? locality
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
