import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Layout, Menu} from "antd";
import Sider from "antd/lib/layout/Sider";
import {SearchOutlined} from "@ant-design/icons";
import {IconsList} from "../components/UI/IconsList";
import {SelectRegion} from "../components/UI/SelectRegion";
import {Loader} from "../components/Loader";

const SideBar = (props) => {
    const [region, setRegion] = useState(null);
    const [locality, setLocality] = useState(null);
    const [surName, setSurName] = useState(null)

    const handleChangeState = () => {
        props.region(region)
        props.locality(locality)
        props.surName(surName)
    }

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
                <div style={{ textAlign: "center" }}>
                    <Form>
                       <Form.Item style={{paddingTop: '10px'}}>
                           <Input
                               placeholder="Пошук по Прізвищу"
                               onChange={(e) => setSurName(e.target.value)}
                           />
                       </Form.Item>
                        <Form.Item>

                            {props.areas.length ? (
                                <SelectRegion
                                    data={props.areas}
                                    region={setRegion}
                                    locality={setLocality}
                                />
                            ) : (
                                <Loader />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' onClick={handleChangeState}>Поиск</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Menu>
            <br />
            <IconsList />
        </Sider>
    );
}



export default SideBar;