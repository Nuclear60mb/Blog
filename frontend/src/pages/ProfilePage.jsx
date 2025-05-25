import { useEffect, useState, React } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Card, Descriptions, Spin, Alert, Avatar, Button } from 'antd';
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
        setError('Не удалось загрузить информацию о пользователе');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Spin tip="Загрузка..." />;
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
        <div>
          <Button href='/changeinfo'>Change information</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage