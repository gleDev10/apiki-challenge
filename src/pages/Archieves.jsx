import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../services/api.js";
import post_estrutura from "../helpers/uteis.js";
import ArticleCard from "../components/ArticleCard.jsx";
import Loading from "../components/Loading.jsx";

function Archieves() {
  const [post, setPost] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const { term, term_slug } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  async function getMorePosts() {
    setIsLoading(true);

    setCurrentPage(currentPage + 1);
    try {
      const response = await getPosts(
        `/posts?_embed&${term}=${term_slug}&page=${currentPage}`
      );
      const newData = await post_estrutura(response.data);

      console.log(newData);
      setPost((post) => [...post, ...newData]);
      setIsLoading(false);
    } catch (error) {
      setCurrentPage(currentPage - 1);
      console.error(error);
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    // Get post inicial
    async function getAllPosts() {
      try {
        const response = await getPosts(`/posts?_embed&${term}=${term_slug}`);
        // Faça algo com a resposta da requisição
        setCurrentPage((currentPage) => currentPage + 1);
        console.log(response.headers);
        setTotalPages(response.headers["x-wp-totalpages"]);
        const dataPost = await post_estrutura(response.data);
        setPost(dataPost);
        if (dataPost == undefined || response.headers["x-wp-total"] === "0")
          navigate("/not-found");
      } catch (error) {
        // Lida com erros caso ocorram
        navigate("/not-found");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllPosts();
  }, [term, term_slug, navigate]);

  if (!post) return <Loading />;
  // if (isLoading) return <Loading />;

  return (
    <section id="posts">
      <div className="container">
        {!isLoading && post[0] && (
          <div className="row">
            <div className="col">
              <h1 style={{ marginBottom: "3rem" }}>
                Posts sobre:{" "}
                <span style={{ color: "var(--theme-color-orange-2)" }}>
                  {post[0].category_term.name}
                </span>
              </h1>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col">
            <div className="grid">
              {post &&
                post.map((post, index) => (
                  <ArticleCard article={{ post }} key={index} />
                ))}
            </div>
            {isLoading ? (
              <Loading />
            ) : currentPage <= totalPages ? (
              <button
                onClick={getMorePosts}
                disabled={isLoading}
                className="load-more"
              >
                Carregar mais...
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Archieves;
