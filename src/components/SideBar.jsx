import React from "react";
import post_estrutura from "../helpers/uteis";
import { getPosts } from "../services/api";
import "../assets/css/sidebar.css";
function Sidebar() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function getAllPosts() {
      try {
        const response = await getPosts("/posts?_embed");
        // Faça algo com a resposta da requisição
        const dataPost = await post_estrutura(response.data);
        setPosts(dataPost);
      } catch (error) {
        // Lida com erros caso ocorram
        console.error(error);
      }
    }
    getAllPosts();
  }, []);

  return (
    <aside id="sidebar">
      {posts && (
        <section className="widget">
          <h2 className="widget__title">Posts Recentes</h2>
          <div className="widget__posts-recentes">
            <ol>
              {posts.map(({ id, slug, title }, index) => {
                if (index < 5) {
                  return (
                    <li key={id}>
                      <a href={slug}>{title}</a>
                    </li>
                  );
                }
              })}
            </ol>
          </div>
        </section>
      )}
      <section className="widget">
        <h2 className="widget__title">
          Receba gratuitamente nossos counteúdos sobre WordPress
        </h2>
        <form action="">
          <div className="form-group">
            <label htmlFor="subscribe">Nome</label>
            <input type="text" name="subscribe" required />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">E-mail</label>
            <input type="email" name="emailInput" required />
          </div>
          <button type="submit">Receber agora</button>
        </form>
      </section>
    </aside>
  );
}
export default Sidebar;
