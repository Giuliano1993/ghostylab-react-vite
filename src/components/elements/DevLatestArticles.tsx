import { useState } from "react";
import axios from "axios";

interface DevArticle { 
    title: string,
    url: string,
    cover_image: string,
    tag_list: string[]
  }

const DevLatestArticles = ()=>{

    
  const [articles, setArticles] = useState<Array<DevArticle>>([])

  axios.get("https://dev.to/api/articles?username=giuliano1993&per_page=3").then((res)=>{
    setArticles(res.data)
  })

  return <div id="latest-articles">
    <h2>My latest articles</h2>
  {
    articles.map((a)=>{
      return <div className="article">
        <h3>{a.title}</h3>
        <div className="hastags">
          {a.tag_list.map((tag)=><span> #{tag}</span>)}
        </div>
        <a href={a.url} target="_blank" rel="noreferrer">Go to article</a>
      </div>
    })
  }
  </div> 

}
export default DevLatestArticles