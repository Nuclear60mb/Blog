import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';

import api from '../api/api';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append('username', values.email);
            formData.append('password', values.password);

            const res = await api.post('/auth/login', formData);
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Успешный вход');
            navigate('/profile');
        } catch (err) {
            message.error('Ошибка авторизации');
        } finally {
            setLoading(false);
        }
      };
    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit" loading={loading}>
                    Log in
                </Button>
                or <a href="/auth/register">Register now!</a>
            </Form.Item>
        </Form>
    );
};
export default LoginPage;