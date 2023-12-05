import React from 'react';
import {SmileOutlined} from '@ant-design/icons';
import {Button, message, notification} from 'antd';

const openNotification = (type, msg, description) => {
    notification[type]({
        message:msg,
        description,
        icon: <SmileOutlined style={{color: '#108ee9'}}/>,
    });
}

export const successNotification = (type, msg, description) => {
    openNotification('success', msg, description)
}
export const errorNotification = (type, msg, description) => {
    openNotification('error', msg, description)
}
export const infoNotification = (type, msg, description) => {
    openNotification('info', msg, description)
}
export const warningNotification = (type, msg, description) => {
    openNotification('warning', msg, description)
}
