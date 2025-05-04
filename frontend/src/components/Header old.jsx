import React, { useState } from 'react';
import { SettingOutlined, TeamOutlined, UserAddOutlined, OrderedListOutlined, } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

function Header() {

  const [Page, setCurrentPage] = useState('posts');

  const items = [
    {
      label: 'sign up',
      key: 'sign up',
      icon: <UserAddOutlined />,
      disabled: true,
    },
    {
      label: 'Log in',
      key: 'log in',
      icon: <TeamOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            { label: 'Option 3', key: 'setting:3' },
            { label: 'Option 4', key: 'setting:4' },
          ],
        },
      ],
    },
    {
      label: <Link to="/posts">Posts</Link>,
      key: 'posts',
      icon: <OrderedListOutlined />,
    },
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
  ];
  // const [current, setCurrent] = useState('mail');
  const onClick = e => {
    console.log('click ', e);
    setCurrentPage(e.key);
  };

  return (
    <div className='header'>
      <Menu
        onClick={onClick}
        selectedKeys={[Page]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
//   return (
//     <div dir="rtl">
//         <Menu
//           onClick={onClick}
//           selectedKeys={[current]}
//           mode="horizontal"
//           items={items}
//         />;
//     </div>

//   )
// };

export default Header