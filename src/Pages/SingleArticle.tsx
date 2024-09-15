import { useParams } from "react-router-dom";
import Article from "../Models/Article";
import { useEffect, useState } from "react";
import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import "../assets/css/dracula.css";

const SingleArticle = () => {
    const { id } = useParams(); 
    const [article, setArticle] = useState<Article>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(!id) return;
        setLoading(true);
        Article.get(parseInt(id)).then(async (article)=>{
            if(!article) return;
            setArticle(article);
            setLoading(false);
            article.content = await renderetContent(article.content);
        });
        
    },[])
    const renderetContent = (content: string) => {
        const marked = new Marked(
            markedHighlight({
              langPrefix: 'hljs language-',
              highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                
                return hljs.highlight(code, { language }).value;
              }
            })
          )
          return marked.parse(content);
        }
    return (<div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="article-content">
            <h1>{ article?.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: article?.content ?? ''}} />
          </div>
        )}
    </div>)
}
export default SingleArticle;