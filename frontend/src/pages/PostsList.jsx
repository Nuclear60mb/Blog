import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { Link, } from 'react-router-dom';

// import Header from '../components/Header old';

function PostsList() {

  const { Meta } = Card;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error to load posts:', error));
  }, []);



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