import { HeartTwoTone } from '@ant-design/icons';
import { Button, Tooltip, Row, Col } from 'antd';
import React from 'react';

export const IconsList = (props) => {
  return (
    <Row>
      <Col>
        <Tooltip
          title="Монтаж напівпобутових кондиціонерів"
          placement="rightTop"
        >
          <Button icon={<HeartTwoTone />} />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Монтаж побутових кондиціонерів" placement="rightTop">
          <Button icon={<HeartTwoTone />} />
        </Tooltip>
      </Col>
    </Row>
  );
};
