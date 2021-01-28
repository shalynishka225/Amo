import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

export const CardListWorker = (props) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const handleOk = (id) => {
    props.onDelete(id);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Card title="Моя анкета">
      {props.state.map((worker) => {
        return (
          <Card
            key={worker._id}
            style={{ marginTop: 16 }}
            type="inner"
            title={
              worker.firstName +
              " " +
              worker.secondName +
              " " +
              worker.thirdName
            }
            extra={<Link to={`/detail/${worker._id}`}>Детальнее</Link>}
            actions={[
              <EditOutlined
                onClick={() => history.push(`/edit/${worker._id}`)}
              />,
              <EllipsisOutlined />,
              <DeleteTwoTone
                twoToneColor="#cf1322"
                onClick={() => {
                  setVisible(true);
                }}
              />,
            ]}
          >
            <Meta avatar={<Avatar src={worker.avatar} />} />
            <Modal
              visible={visible}
              title="Удаление анкеты"
              onOk={() => handleOk(worker)}
              onCancel={handleCancel}
              footer={[
                <Button key="Cancel" onClick={handleCancel}>
                  Отменить
                </Button>,
                <Button
                  onClick={() => {
                    handleOk(worker._id);
                  }}
                  key="submit"
                  type="primary"
                >
                  Да
                </Button>,
              ]}
            >
              <p>Вы точно хотите удалить анкету?</p>
            </Modal>
          </Card>
        );
      })}
    </Card>
  );
};
