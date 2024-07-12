import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teams = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const [newCommentContent, setNewCommentContent] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts')
            .then(response => {
                setPosts(response.data.map(post => ({
                    ...post,
                    comments: post.comments || [],
                    likes: post.likes || []
                })));
            })
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
    }, []);

    const handleNewPost = () => {
        const formData = new FormData();
        formData.append('userId', 1);
        formData.append('content', newPostContent);
        if (newPostImage) {
            formData.append('image', newPostImage);
        }

        axios.post('http://localhost:5000/api/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setPosts([response.data, ...posts]);
                setNewPostContent('');
                setNewPostImage(null);
            })
            .catch(error => {
                console.error('There was an error creating the post!', error);
            });
    };

    const handleNewComment = (postId) => {
        axios.post('http://localhost:5000/api/posts/comment', { postId, userId: 1, content: newCommentContent[postId] })
            .then(response => {
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return { ...post, comments: [response.data, ...post.comments] };
                    }
                    return post;
                });
                setPosts(updatedPosts);
                setNewCommentContent({ ...newCommentContent, [postId]: '' });
            })
            .catch(error => {
                console.error('There was an error creating the comment!', error);
            });
    };

    const handleLike = (postId) => {
        axios.post('http://localhost:5000/api/posts/like', { postId, userId: 1 })
            .then(response => {
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return { ...post, likes: [...post.likes, response.data] };
                    }
                    return post;
                });
                setPosts(updatedPosts);
            })
            .catch(error => {
                console.error('There was an error liking the post!', error);
            });
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Teams</h1>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setNewPostImage(e.target.files[0])}
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNewPost}
                >
                    Post
                </button>
            </div>
            {posts.map(post => (
                <div key={post.id} className="bg-white dark:bg-darkCard p-4 shadow-md rounded-lg mb-4">
                    <p className="text-gray-900 dark:text-white">{post.content}</p>
                    {post.imageUrl && <img src={`http://localhost:5000${post.imageUrl}`} alt="Post" className="w-full h-auto mt-4" />}
                    <button
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => handleLike(post.id)}
                    >
                        Like ({post.likes ? post.likes.length : 0})
                    </button>
                    <div className="mt-4">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Add a comment"
                            value={newCommentContent[post.id] || ''}
                            onChange={(e) => setNewCommentContent({ ...newCommentContent, [post.id]: e.target.value })}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleNewComment(post.id)}
                        >
                            Comment
                        </button>
                    </div>
                    <div className="mt-4">
                        {post.comments && post.comments.map(comment => (
                            <p key={comment.id} className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Teams;
