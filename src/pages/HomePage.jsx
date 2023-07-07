import ArticleCard from "../components/ArticleCard";
import "../assets/css/home-page.css";
import React from "react";
import { getPosts } from "../services/api";
import post_estrutura from "../helpers/uteis";
import Loading from "../components/Loading";

function HomePage() {
  const [post, setPost] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  async function getMorePosts() {
    setIsLoading(true);

    setCurrentPage(currentPage + 1);
    try {
      const response = await getPosts(`/posts?_embed&page=${currentPage}`);
      const newData = await post_estrutura(response.data);
      setPost((post) => [...post, ...newData]);
      setIsLoading(false);
    } catch (error) {
      setCurrentPage(currentPage - 1);
      console.error(error);
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    async function getAllPosts() {
      try {
        const response = await getPosts("/posts?_embed");
        setCurrentPage((currentPage) => currentPage + 1);
        setTotalPages(response.headers["x-wp-totalpages"]);
        const dataPost = await post_estrutura(response.data);
        setPost(dataPost);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getAllPosts();
  }, []);

  if (!post) return <Loading />;

  return (
    <>
      <section id="posts">
        <div className="container">
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
    </>
  );
}

export default HomePage;
