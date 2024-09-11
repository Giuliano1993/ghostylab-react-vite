import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Articles from '../../../Models/Articles';

const EditArticle: React.FC = () => {
    
    const {id} = useParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isNewsletter, setIsNewsletter] = useState<boolean>(false);

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(()=>{
        if(!id || isNaN(parseInt(id))){
            navigate('/admin/articles');
            return;
        }
        Articles.get(parseInt(id)).then((data) => {
            if(data){
                setTitle(data.title);
                setContent(data.content);
                setIsPublic(data.public);
                setIsNewsletter(data.newsletter);
            }
        })
    },[])

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            setLoading(true);
            const updatedArticle = {
                title, content, public:isPublic, newsletter:isNewsletter
            }

            if(!id || isNaN(parseInt(id))) return
            const res = await Articles.update(parseInt(id), updatedArticle);
            console.log(res);
            
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
        navigate('/admin/articles');

    }
    
    return (
        <div>
            <h1>Edit Article</h1>
            <form onSubmit={formSubmit} id="articleForm" className="article-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <div className="form-group checkbox-group">
                    <div>
                        <input type="checkbox" id="public" checked={isPublic} onChange={(e)=>setIsPublic(e.target.checked)}/>
                        <label htmlFor="public">Public</label>
                    </div>
                    <div>
                        <input type="checkbox" id="newsletter" checked={isNewsletter} onChange={(e)=>setIsNewsletter(e.target.checked)}/>
                        <label htmlFor="newsletter">Newsletter</label>
                    </div>
                </div>
                <button type="submit" className='btn'>Update Article</button>
            </form>
        </div>
    )
}

export default EditArticle;