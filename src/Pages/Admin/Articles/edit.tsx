import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Articles from '../../../Models/Articles';
import {Marked} from 'marked';

import { Blocks } from 'react-loader-spinner';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import plaintext from 'highlight.js/lib/languages/plaintext';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
const EditArticle: React.FC = () => {
    
    const {id} = useParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isNewsletter, setIsNewsletter] = useState<boolean>(false);
    const [htmlContent, setHtmlContent] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(()=>{
        if(!id || isNaN(parseInt(id))){
            navigate('/admin/articles');
            return;
        }
        Articles.get(parseInt(id)).then(async (data) => {
            if(data){
                setTitle(data.title);
                setContent(data.content);
                setIsPublic(data.public);
                setIsNewsletter(data.newsletter);  
                const marked = new Marked(
                    markedHighlight({
                      langPrefix: 'hljs language-',
                      highlight(code, lang, info) {
                        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                        
                        return hljs.highlight(code, { language }).value;
                      }
                    })
                  )
                const htmlContent = await marked.parse(data.content);
                setHtmlContent(htmlContent);
            }
        })
    },[])


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        

        const marked = new Marked(
            markedHighlight({
              langPrefix: 'hljs language-',
              highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                
                return hljs.highlight(code, { language }).value;
              }
            })
          )

        const htmlContent = await marked.parse(e.currentTarget.value);
        setHtmlContent(htmlContent);
        


    }
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
                    <textarea id="content" value={content} onChange={(e)=>setContent(e.target.value)} onKeyDown={handleKeyDown}/>
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
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
}

export default EditArticle;