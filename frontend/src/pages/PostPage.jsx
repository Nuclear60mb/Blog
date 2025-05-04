import { useEffect, useState, React } from 'react';
import { Divider } from 'antd';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Post not found');
                }
                return res.json();
            })
            .then((data) => {
                setPost(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id]);

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
            {post.created_at    }
        </p>
    </>)

};
export default PostPage;