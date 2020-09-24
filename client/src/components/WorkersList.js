import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const WorkersList = ({ workers }) => {
  const { Meta } = Card;

  if (!workers.length) {
    return <p>Анкет пока нет</p>;
  }

  return (
    <div>
      {workers.map((worker, index) => {
        return (
          <Card
            key={index}
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={worker.avatar}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <Link to={`/detail/${worker._id}`}>
                <EllipsisOutlined key="ellipsis" />
              </Link>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src= {worker.avatar} />
              }
              title={
                worker.firstName +
                " " +
                worker.secondName +
                " " +
                worker.thirdName
              }
              description={
                "на сайте с " + new Date(worker.date).toLocaleDateString()
              }
            />
          </Card>
        );
      })}
    </div>
  );
};
