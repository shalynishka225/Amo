import { HomeOutlined, SettingFilled, SmileOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import QRCode from 'react-qr-code/lib/components/QRCode';
import { Link } from 'react-router-dom';

export const WorkerForm = (props) => {
  return props.state.map((worker, index) => {
    return (
      <Col span={8} key={index} style={{ width: 300 }}>
        <Card hoverable key={index} style={{ margin: '1rem' }}>
          <Meta
            avatar={<Avatar src={worker.avatar} />}
            title={
              worker.firstName +
              ' ' +
              worker.secondName +
              ' ' +
              worker.thirdName
            }
            description={
              'на сайте с ' + new Date(worker.date).toLocaleDateString()
            }
          />
          <Row>
            <Col>
              <QRCode size={50} value={`/detail/${worker._id}`} />
            </Col>
            <Col>
              <div className="icons-list">
                <HomeOutlined />
                <SettingFilled />
                <SmileOutlined />
              </div>
            </Col>
            <Button danger>Удалить анкету</Button>
          </Row>
        </Card>
      </Col>
    );
  });
};
