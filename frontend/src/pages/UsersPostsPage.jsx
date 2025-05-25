import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin, Alert } from 'antd';
import { Link, } from 'react-router-dom';

import api from '../api/api';


function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { Meta } = Card;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts/user_posts');
        setPosts(res.data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert type="error" message={error} />;



  return (
    <div>
      <Row gutter={[16, 16]} style={{ padding: '20px' }}>
        {posts.map((post) => (
          <Col span={8} key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <Card hoverable>
                <Meta
                  title={post.title}
                  description={truncateText(post.content || '', 100)}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PostsList 