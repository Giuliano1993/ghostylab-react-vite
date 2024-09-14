import { useEffect, useState } from "react";
import Article from "../Models/Article";

const Articles = () => {

    const [articles, setArticles] = useState<Array<Article>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        const getArticles = async () => {
            setLoading(true);
            Article.all().then((data) => {
                setArticles(data);
                setLoading(false);
            })
        }
        getArticles();
    },[])

    return (
        <div>
            <h1>My Posts</h1>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    articles.map((article) => (
                        <div key={article.id}>
                            <h2>{article.title}</h2>
                        </div>
                    ))
                )}
            </div>  
        </div>
    )
}

export default Articles;