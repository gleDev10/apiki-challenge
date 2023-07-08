import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/single-page.css";
import Loading from "../components/Loading";
import post_estrutura, { removeLinkCurrentBlog } from "../helpers/uteis";
import { getPosts } from "../services/api";
import Sidebar from "../components/SideBar";
import { Helmet } from "react-helmet-async";
function SinglePost() {
  const [singlePost, setSinglePost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    setIsLoading(true);
    async function getAllPosts() {
      try {
        const response = await getPosts(`/posts?_embed&slug=${params.slug}`);
        const [post] = await post_estrutura(response.data);
        setSinglePost(post);
        if (post == undefined) navigate("/not-found");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllPosts();
  }, [params.slug, navigate]);

  if (!singlePost || isLoading) return <Loading />;
  if (singlePost) {
    removeLinkCurrentBlog();
  }

  return (
    <>
      <Helmet>
        {Object.keys(singlePost.seo).map((key, index) => {
          if (typeof singlePost.seo[key] === "string") {
            return (
              <meta key={index} name={key} content={singlePost.seo[key]} />
            );
          }
          return null; // Retorna null se a propriedade SEO for um objeto
        })}
        <title>{singlePost.title} - Blog Apiki</title>
      </Helmet>
      <section className="single-post">
        <div className="container">
          <div className="row">
            <div className="col col-8 col-sm-12 single-content">
              <article
                className={`single-post__content content post-${singlePost.id} ${singlePost.type}`}
              >
                <header>
                  <h1
                    className="single-title"
                    dangerouslySetInnerHTML={{ __html: singlePost.title }}
                  ></h1>
                  <ul className="post-meta">
                    <li>
                      <div className="meta-author">
                        <img
                          src={singlePost.author.image}
                          alt={`Post by ${singlePost.author.name}`}
                          width={36}
                          height={36}
                        />
                        <a href="#" title={`Post by ${singlePost.author.name}`}>
                          by <strong>{singlePost.author.name}</strong>
                        </a>
                      </div>
                    </li>
                    <li>
                      <a
                        href={`/categories/${singlePost.category_term.id}`}
                        title={singlePost.category}
                      >
                        {singlePost.category}
                      </a>
                    </li>
                    <li>
                      <time dateTime={singlePost.modified}>
                        {new Date(singlePost.modified).toLocaleDateString(
                          "pt-br"
                        )}
                      </time>
                    </li>
                  </ul>
                  <img
                    src={singlePost.image.url}
                    alt={singlePost.alt ? singlePost.alt : singlePost.title}
                    loading="lazy"
                  />
                </header>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: singlePost.content }}
                ></div>
              </article>
            </div>
            <div className="col col-4 col-sm-12 ">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SinglePost;
