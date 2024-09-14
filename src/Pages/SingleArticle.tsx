import { useParams } from "react-router-dom";
import Article from "../Models/Article";
import { useEffect, useState } from "react";
const SingleArticle = () => {
    const { id } = useParams(); 
    const [article, setArticle] = useState<Article>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(!id) return;
        setLoading(true);
        Article.get(parseInt(id)).then((article)=>{
            if(!article) return;
            setArticle(article);
            setLoading(false);
        });
        
    })
    return (<div>
        <h1>{ article?.title }</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>{article?.content}</p>
          </div>
        )}
    </div>)
}
export default SingleArticle;