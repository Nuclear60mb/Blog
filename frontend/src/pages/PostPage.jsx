import React, { useEffect, useState, } from 'react';
import { Divider, Button, Popconfirm, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../api/api';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/user_post/${id}`);
                setPost(res.data);
            } catch (err) {
                message.error('Post not found');
                setPost(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/delete_post/${id}`);
            message.success('Post successfully deleted');
            navigate('/posts/my_posts');
        } catch (err) {
            message.error('Error deleting post');
        }
    };

    const handleUpdate = () => {
        navigate(`/posts/update_post/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (<>
        <h1>
            {post.title}
        </h1>
        <Divider />
        <p>
            {post.content}
        </p>
        <Divider dashed />
        <p>
            {post.created_at}
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Button type="primary" onClick={handleUpdate}>
                Обновить пост
            </Button>
            <Popconfirm
                title="Delete this post?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Delete</Button>
            </Popconfirm>
        </div>
    </>)

};
export default PostPage;