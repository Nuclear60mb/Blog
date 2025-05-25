import React, { useEffect, useState } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Descriptions, Spin, Alert, Avatar, Button } from 'antd';

import api from '../api/api';

function ProfilePage(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert type="error" message={error} />;

  const items = [
    {
      key: '1',
      label: 'Username',
      children: user.username,
    },
    {
      key: '2',
      label: 'Email',
      children: user.email,
    },
    {
      key: '3',
      label: 'Live',
      children: user.live,
    },
    {
      key: '4',
      label: 'posts',
      children: user.posts,
    },
    {
      key: '5',
      label: 'Gender',
      children: user.gender,
    },
    {
      birthday: '6',
      label: 'Birthday',
      children: user.birthday,
    },
    {
      key: '7',
      label: 'Bio',
      children: user.user_bio,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <Button href='/posts/create_post'>Add new post</Button>
            <Button href="/posts/my_posts">My posts</Button>
          </div>
          <Button
            color="purple"
            variant="filled"
            href='/profile/change_my_info'
            style={{ marginLeft: 860 }}
          >
            Change information
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage