import { useEffect, useState } from "react";
import Articles from "../../../Models/Articles";

const ArticleIndexPage = () => {

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(()=>{
        
        const getArticles = async () => {
            setLoading(true);
            Articles.all().then((data: Article[]) => {
                setArticles(data);
                setLoading(false);
            })
        }
        getArticles();

    },[])

    return (
        <div>
            <h1>Articles</h1>
            <p>Articles Index Page</p>
            <a className="btn" href="/admin/articles/new">New Article</a>
            {loading ? ( 
                <p>Loading...</p> 
            ) : (
                console.log(articles),
                articles.map((a: Article)=>{ return (
                    <div key={a.id}>
                        <h2>
                            <a href={`/admin/articles/${a.id}/edit`}>{a.title}</a>
                        </h2>
                    </div>
                )})
            )}
        </div>
    )
}

export default ArticleIndexPage;