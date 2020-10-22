import React, {useState} from 'react'
import {Button, Card, Modal} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/es/card/Meta";
import { EditOutlined, EllipsisOutlined, DeleteTwoTone } from '@ant-design/icons';

export const CardListWorker = props => {
    const [visible, setVisible] = useState(false)

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return(
        <Card title="Мои анкеты">
            {props.state.map((worker, index) => {
                return (
                    <Card
                        key={index}
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={worker.firstName + ' ' + worker.secondName + ' ' + worker.thirdName}
                        extra={<a href={`/detail/${worker._id}`}>Детальнее</a>}
                        actions={[
                            <EditOutlined />,
                            <EllipsisOutlined/>,
                            <DeleteTwoTone twoToneColor="#cf1322" onClick={() => {
                                setVisible(true)
                            }} />
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={worker.avatar} />}
                        />
                        <Modal
                            visible={visible}
                            title="Удаление анкеты"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="Cancel" onClick={handleCancel}>
                                    Отменить
                                </Button>,
                                <Button key="submit" type="primary" onClick={() => {
                                    handleOk()
                                }}>
                                    Да
                                </Button>,
                            ]}
                        >
                            <p>Вы точно хотите удалить анкету?</p>
                        </Modal>
                    </Card>

                )
            })}
        </Card>
    )
}