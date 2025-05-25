import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    message,
} from 'antd';

import api from '../api/api';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const ChangeUserInfoPage = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {};
            if (values.email) payload.email = values.email;
            if (values.username) payload.username = values.username;
            if (values.live) payload.live = values.live;
            if (values.gender) payload.gender = values.gender;
            if (values.bio) payload.user_bio = values.bio;
            if (values.birthday) payload.birthday = values.birthday.format('YYYY-MM-DD');

            await api.patch('/users/me', payload);

            message.success('Information has been successfully updated');
            navigate('/profile');
        } catch (err) {
            message.error('Ошибка обновления данных');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="ChangeUserInfo"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: false,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="username"
                label="Username"
                tooltip="What do you want others to call you?"
                rules={[{ required: false, message: 'Please input your username!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="live"
                label="Live"
                tooltip="Where are you from?"
                rules={[{ required: false, message: 'Please input your location!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Birthday"
                name="birthday"
                tooltip="When is your birthday?"
                rules={[{ required: false, message: 'Please input your birthday!' }]}
            >
                <DatePicker />
            </Form.Item>
            
            <Form.Item
                name="bio"
                label="Bio"
                tooltip="What do you want others to know about you?"
                rules={[{ required: false, message: 'Please input something about you' }]}
            >
                <Input.TextArea showCount maxLength={250} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: false, message: 'Please select gender!' }]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Apply
                </Button>
            </Form.Item>
        </Form>
    );
};
export default ChangeUserInfoPage;