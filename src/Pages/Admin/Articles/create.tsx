import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Articles from '../../../Models/Articles';
import {marked} from 'marked';


const CreateArticle: React.FC = () => {
    
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isNewsletter, setIsNewsletter] = useState<boolean>(false);
    const [htmlContent, setHtmlContent] = useState<string>('');

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
    

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        
        const htmlContent = await marked.parse(e.currentTarget.value);
        setHtmlContent(htmlContent);
        


    }


    return (
        <div>
            <h1>Create Article</h1>
            <form onSubmit={formSubmit} id="articleForm" className="article-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" value={content} onChange={(e)=>setContent(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <div className="form-group checkbox-group">
                    <div>
                        <input type="checkbox" id="public" checked={isPublic} onChange={(e)=>setIsPublic(e.target.checked)} />
                        <label htmlFor="public">Public</label>
                    </div>
                    <div>
                        <input type="checkbox" id="newsletter" checked={isNewsletter} onChange={(e)=>setIsNewsletter(e.target.checked)}/>
                        <label htmlFor="newsletter">Newsletter</label>
                    </div>
                </div>
                <button type="submit" className='btn'>Create Article</button>
            </form>

            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
}

export default CreateArticle;