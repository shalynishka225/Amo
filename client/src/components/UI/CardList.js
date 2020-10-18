import { HomeOutlined, SettingFilled, SmileOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import QRCode from 'react-qr-code/lib/components/QRCode';
import { Link } from 'react-router-dom';

export const CardList = props => {
    const { Meta } = Card;

    const filteredByName = props.state.filter((user) => {
      return user.secondName.toLowerCase().includes(props.search);
    })

    return(
        <Row>
            {props.search
            ? filteredByName.map((worker, index) => {
              return (
                <Col span={8} key={index} style={{ width: 300 }}>
                  <Link to={`/detail/${worker._id}`}>
                    <Card hoverable key={index} style={{ margin: "1rem" }}>
                      <Meta
                        avatar={<Avatar src={worker.avatar} />}
                        title={
                          worker.firstName +
                          " " +
                          worker.secondName +
                          " " +
                          worker.thirdName
                        }
                        description={
                          "на сайте с " +
                          new Date(worker.date).toLocaleDateString()
                        }
                      />
                      <Row>
                        <Col>
                          <QRCode
                            size={50}
                            value={`/detail/${worker._id}`}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Col>
              );
            })
          : props.state.map((worker, index) => {
            return (
              <Col span={8} key={index} style={{ width: 300 }}>
                <Link to={`/detail/${worker._id}`}>
                  <Card hoverable key={index} style={{ margin: "1rem" }}>
                    <Meta
                      avatar={<Avatar src={worker.avatar} />}
                      title={
                        worker.firstName +
                        " " +
                        worker.secondName +
                        " " +
                        worker.thirdName
                      }
                      description={
                        "на сайте с " +
                        new Date(worker.date).toLocaleDateString()
                      }
                    />
                    <Row>
                      <Col>
                        <QRCode
                          size={50}
                          value={`/detail/${worker._id}`}
                        />
                      </Col>
                      <Col>
                        <div className="icons-list">
                          <HomeOutlined />
                          <SettingFilled />
                          <SmileOutlined />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
    )
    
}