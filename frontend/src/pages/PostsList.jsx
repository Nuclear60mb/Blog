import React, { useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Card, Spin, Alert } from 'antd';

import api from '../api/api';


const PostsListNew = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        current: 1,
        pageSize: 10
    });

    const { Meta } = Card;

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    // Вынесите fetchPosts наружу
    const fetchPosts = async (page = 1) => {
        setLoading(true);
        try {
            const offset = (page - 1) * pagination.pageSize;
            const res = await api.get('/posts', {
                params: { offset, limit: pagination.pageSize }
            });

            setPosts(res.data.items || []);
            setPagination(prev => ({
                ...prev,
                total: res.data.total || 0,
                current: page,
            }));
        } catch (err) {
            setError('Failed to load posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(pagination.current);
        // eslint-disable-next-line
    }, []);

    const handlePageChange = (page) => {
        fetchPosts(page);
    };

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert type="error" message={error} />;


    const data = posts.map((post, i) => ({
        href: `/posts/${post.id}`,
        title: post.title,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description: post.content ? truncateText(post.content, 100) : 'No content available',
        content: post.content,
        id: post.id,
    }));
    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                current: pagination.current,
                total: pagination.total,
                pageSize: pagination.pageSize,
                onChange: handlePageChange,
            }}
            dataSource={data}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />

    )

};
export default PostsListNew;