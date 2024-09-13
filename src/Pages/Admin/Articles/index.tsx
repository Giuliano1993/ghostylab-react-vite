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
        <div id="admin-article-list">
            <div className="header">
                <h1>Articles</h1>
                <a className="btn" href="/admin/articles/new">New Article</a>
            </div>
            <div>
                {loading ? ( 
                    <p>Loading...</p> 
                ) : (
                    console.log(articles),
                    articles.map((a: Article)=>{ return (
                        <div key={a.id}>
                            <h2>
                                {a.title}
                            </h2>
                            <a href={`/admin/articles/${a.id}/edit`} className="btn">Edit</a>
                        </div>
                    )})
                )}
            </div>
        </div>
    )
}

export default ArticleIndexPage;