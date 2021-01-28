import React from "react";
import {Card, Col, Row} from "antd";
import {Loader} from "./Loader";
import {Link} from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";
import QRCode from "react-qr-code/lib/components/QRCode";

export const WorkersList = ({workers}) => {

    return (
        <Row>
            {
                workers && workers.map((worker) => {
                    return (
                        <Col span={8} key={worker._id} style={{width: 300}}>
                            <Link to={`/detail/${worker._id}`}>
                                <Card hoverable style={{margin: "1rem"}}>
                                    <Meta
                                        avatar={<Avatar src={worker.avatar}/>}
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
                                            <small>{worker.locality}</small>
                                        </Col>
                                    </Row>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
        </Row>
    );
};
