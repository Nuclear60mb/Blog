import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    DatePicker,
    message,
} from 'antd';

import api from '../api/api';

const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
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
            console.log(payload);

            message.success('Information has been successfully updated');
            navigate('/profile');
        } catch (err) {
            message.error('Ошибка обновления данных');
        } finally {
            setLoading(false);
        }
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const onWebsiteChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));
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