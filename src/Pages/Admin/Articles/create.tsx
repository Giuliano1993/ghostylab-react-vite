import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../utils/supabase';
import Articles from '../../../Models/Articles';

const CreateArticle: React.FC = () => {
    
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isNewsletter, setIsNewsletter] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            setLoading(true);
            const newArticle = {
                title, content, public:isPublic, newsletter:isNewsletter
            }
            const res = await Articles.create(newArticle);
            console.log(res);
            
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
        //navigate('/admin/articles');

    }
    
    return (
        <div>
            <h1>Create Article</h1>
            <form onSubmit={formSubmit} id="#articleForm">
                <label>
                    Title
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label>
                    Content
                    <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
                </label>
                <label>
                    Public
                    <input type="checkbox" checked={isPublic} onChange={(e)=>setIsPublic(e.target.checked)}/>
                </label>
                <label>
                    Newsletter
                    <input type="checkbox" checked={isNewsletter} onChange={(e)=>setIsPublic(e.target.checked)}/>
                </label>
                <button type="submit">Create Article</button>
            </form>
        </div>
    )
}

export default CreateArticle;