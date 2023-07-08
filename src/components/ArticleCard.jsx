import "../assets/css/article-card.css";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedinIn,
  FaPinterestP,
  FaShare,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import PropTypes from "prop-types";

const ArticleCard = ({ article }) => {
  const { post } = article;
  function handleShareButtons(event) {
    event.preventDefault();
    event.currentTarget.nextSibling.classList.toggle("active");
    if (event.currentTarget.classList.contains("icon-share")) {
      event.currentTarget.classList.remove("icon-share");
      event.currentTarget.classList.add("icon-close");
    } else {
      event.currentTarget.classList.add("icon-share");
      event.currentTarget.classList.remove("icon-close");
    }
  }

  return (
    <article className={`post-article post-${post.id}`}>
      <div className="post-thumb post-article__thumb">
        <a href={post.slug} title={post.title}>
          <img
            src={post.image.url}
            alt={post.alt ? post.alt : post.title}
            width={post.image.width}
            height={post.image.height}
            loading="lazy"
          />
        </a>
        <span className="post-category post-article__category">
          <a href={`/categories/${post.category_term.id}`}>{post.category}</a>
        </span>
      </div>
      <div className="post-content">
        <div className="post-meta post-content__meta">
          <div className="meta-author post-content__meta-author">
            <img
              src={post.author.image}
              alt={`Post by ${post.author.name}`}
              width={32}
              height={32}
              loading="lazy"
            />
            <a
              className="post-content__meta-author"
              href="#"
              title={`"Post by ${post.author.name}`}
            >
              {post.author.name}
            </a>
          </div>
          <time dateTime={post.modified}>
            {new Date(post.modified).toLocaleDateString("pt-br")}
          </time>
        </div>
        <h2 className="post-title">
          <a href={`/${post.slug}`}>{post.title}</a>
        </h2>
        <p
          className="post-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        ></p>
        <hr />
        <div className="post-footer">
          <div className="post-footer--share">
            <button
              className="toggle-button icon-share"
              onClick={handleShareButtons}
              size={24}
            >
              <FaShare className="icon-share" />
              <AiOutlineCloseCircle className="icon-close" />
            </button>
            <ul className="list-share">
              <li>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/${post.slug}&t=${post.title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Share on Facebook</span>
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}/${post.slug}/&text=${post.title}`}
                >
                  <FaTwitter />
                  <span className="sr-only">Share on Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}/${post.slug}/&title=${post.title}`}
                >
                  <FaLinkedinIn />
                  <span className="sr-only">Share on LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${window.location.href}/${post.slug}/&media=&description=${post.title}`}
                >
                  <FaPinterestP />
                  <span className="sr-only">Share on Pinterest</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/share/url?url=${window.location.href}/${post.slug}/&text=${post.title}`}
                >
                  <FaTelegram />
                  <span className="sr-only">Share on Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:info@example.com?&subject=&cc=&bcc=&body=${window.location.href}/${post.slug}`}
                >
                  <FaEnvelope />
                  <span className="sr-only">Share on E-mail</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="post-footer--link">
            <a
              href={`/${post.slug}`}
              role="button"
              title={`Ir para: ${post.title}`}
            >
              <CiMenuKebab
                size={24}
                className="rotate"
                style={{ transform: " rotate(90deg)" }}
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object,
};

export default ArticleCard;
