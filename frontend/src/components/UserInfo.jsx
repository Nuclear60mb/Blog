import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Descriptions } from 'antd';

function UserInfo() {
    const items = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: 'Email',
            children: 'someEMail@gmail.com',
        },
        {
            key: '3',
            label: 'Live',
            children: 'Hangzhou, Zhejiang',
        },
        {
            key: '4',
            label: 'Bio',
            children: 'empty',
        },
        {
            key: '5',
            label: 'Posts',
            children: '#',
        },
    ];
    return (
        <div>
            <div>
                <div>
                    <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                        icon={<AntDesignOutlined />}
                    />
                </div>
                <div>
                    <Descriptions title="User Info" items={items} />
                </div>
            </div>
        </div>
    )
}

export default UserInfo