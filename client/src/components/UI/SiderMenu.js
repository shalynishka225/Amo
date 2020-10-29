import { SearchOutlined } from "@ant-design/icons";
import { Input, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { IconsList } from "./IconsList";
import { SelectRegion } from "./SelectRegion";
import { useDebounce } from "use-debounce";

export const SiderMenu = (props) => {
  const [search, setSearch] = useState("");
  const [fetchedRegion, setFetchedRegion] = useState("");
  const [region, setRegion] = useState("");
  const [locality, setLocality] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedSearch] = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      searchCharacters(debouncedSearch); //.then((results) => {
      //setResults(results);
      //});
    }
  });

  useEffect(() => {
    const fetch = async () => {
      const response = await Axios("https://api.hh.ru/areas/5");
      setFetchedRegion(response.data.areas);
    };
    fetch();
  }, []);

  const searchCharacters = (search) => {
    console.log(search);
    Axios.get("/api/search", {
      lastName: search,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="app" disabled icon={<SearchOutlined />}>
          Пошук в базі
        </Menu.Item>
      </Menu>

      <div style={{ textAlign: "center" }}>
        <form>
          <div style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Input
              placeholder="Пошук по Прізвищу"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ marginLeft: "5px", marginRight: "5px" }}>
            {fetchedRegion.length ? (
              <SelectRegion
                data={fetchedRegion}
                region={setRegion}
                locality={setLocality}
              />
            ) : (
              <Loader />
            )}
          </div>
        </form>
      </div>
      <br />
      <IconsList />
    </Sider>
  );
};

{
  /* <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => props.state(search.toLowerCase())}
        >
          Пошук
        </Button> */
}

{
  /* <div style={{ marginLeft: "5px", marginRight: "5px" }}>
        <Input
          placeholder="Пошук по місту"
          onChange={(value) => setSearch(value.target.value)}
        />
      </div>
      <NumberInput /> */
}
