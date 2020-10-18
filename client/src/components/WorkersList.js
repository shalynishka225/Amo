import React, { useState } from "react";
import { Layout } from "antd";
import { SiderMenu } from "./UI/SiderMenu";
import { CardList } from "./UI/CardList";
import { Loader } from "./Loader";

const { Content } = Layout;

export const WorkersList = ({ workers }) => {
  const [searchWorkers, setSearchWorkers] = useState('');

  if (!workers.length) {
    return <Loader />;
  }

  return (
    <Layout>
      <SiderMenu state={setSearchWorkers} />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <div className="site-card-wrapper">
              { workers.length
              ? <CardList state={workers} search={searchWorkers} /> 
              : <Loader />}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
