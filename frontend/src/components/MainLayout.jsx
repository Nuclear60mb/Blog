import React from 'react';
import { LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    UserAddOutlined,
    TeamOutlined,
    OrderedListOutlined,
    IdcardOutlined,
    UserDeleteOutlined,
    } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useNavigate, } from "react-router-dom"
import { icons } from 'antd/es/image/PreviewGroup';

import { logout } from '../api/api';


const { Header, Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: Array.from({ length: 4 }).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const MainLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login');
    };

    const items1 = [
        {
            label: <Link to="/auth/register">Sign up</Link>,
            key: 'sign up',
            icon: <UserAddOutlined />,
            disabled: false,
        },
        {
            label: <Link to="/auth/login">Log in</Link>,
            key: 'log in',
            icon: <TeamOutlined />,
            disabled: false,
        },
        {
            label: <Link to="/posts">Posts</Link>,
            key: 'posts',
            icon: <OrderedListOutlined />,
        },
        {
            key: 'home',
            label: <Link to="/home">Home</Link>,
            disabled: true,
        },
        {
            label: <Link to='/profile'>My profile</Link>,
            key: 'profile',
            icon: <IdcardOutlined />
        },
        {
            label: <a>logout</a>,
            key: 'logout',
            icon: <UserDeleteOutlined />,
            onClick: handleLogout,    
        }


    ]


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb
                        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default MainLayout;