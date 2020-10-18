import { InfoCircleOutlined } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
import React from 'react'

export const InputWithProps = props => {
    return(
        <Input
          placeholder={props.placeholder}
          name={props.id}
          value={props.name}
          onChange={props.onChange}
          id={props.id}
          type="text"
          suffix={
            <Tooltip title={props.title}>
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
    )
}