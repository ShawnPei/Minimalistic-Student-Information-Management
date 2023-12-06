import React from 'react';
import {ExclamationCircleOutlined, SmileOutlined} from '@ant-design/icons';
import {Button, message, notification} from 'antd';

const openNotification = (type, message, description,placement) => {
    placement = placement ||'topRight'
    notification[type]({message, description, placement});
}

export const successNotification = (msg, description,placement) => {
    openNotification('success', msg, description,placement)
}
export const errorNotification = (msg, description,placement) => {
    openNotification('error', msg, description,placement)
}
export const infoNotification = (msg, description,placement) => {
    openNotification('info', msg, description,placement)
}
export const warningNotification = (msg, description,placement) => {
    openNotification('warning', msg, description,placement)
}
