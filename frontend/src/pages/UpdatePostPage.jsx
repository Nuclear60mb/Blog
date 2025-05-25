import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Upload,
    message,
} from 'antd';

import api from '../api/api';

const { TextArea } = Input;
const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e === null || e === void 0 ? void 0 : e.fileList;
};
const UpdatePostPage = () => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const onFinish = async (values) => {
        try {
            const payload = {
                title: values.title,
                content: values.content,
            };
            await api.put(`/posts/update_post/${id}`, payload);
            message.success('Post successfully updated!');
            navigate('/profile');
        } catch (err) {
            message.error('Error updating post');
        }
    };
    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <Form.Item
                label="Title"
                name="title"
                rules={[{ required: false, message: 'Please input the title of the post' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                label="Content"
                name="content"
                rules={[{ required: false, message: 'Please input the content of the post' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="" valuePropName="fileList" getValueFromEvent={normFile} wrapperCol={{ span: 14, offset: 4 }}>
                    <Upload action="/upload.do" listType="picture-card"  disabled>
                        <button
                            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14 , offset: 4 }}>
                    <Button type='primary' htmlType='submit'>
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <UpdatePostPage />