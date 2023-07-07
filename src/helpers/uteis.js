export default async function post_estrutura(data) {
  let posts = [];
  data.forEach((post) =>
    posts.push({
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      category: post._embedded["wp:term"][0][0].name,
      category_term: {
        id: post._embedded["wp:term"][0][0].id,
        slug: post._embedded["wp:term"][0][0].slug,
        name: post._embedded["wp:term"][0][0].name,
        taxonomy: post._embedded["wp:term"][0][0].taxonomy,
      },
      category_id: post.categories[0],
      type: post.type,
      author: {
        id: post._embedded.author[0].code ? "" : post._embedded.author[0].id,
        name: post._embedded.author[0].code
          ? ""
          : post._embedded.author[0].name,
        image: post._embedded.author[0].code
          ? ""
          : post._embedded.author[0].avatar_urls[48],
        slug: post._embedded.author[0].code
          ? ""
          : post._embedded.author[0].slug,
      },
      modified: post.modified,
      image: {
        url: post._embedded["wp:featuredmedia"][0].media_details.sizes[
          "jnews-750x375"
        ].source_url,
        width:
          post._embedded["wp:featuredmedia"][0].media_details.sizes[
            "jnews-750x375"
          ].width,
        height:
          post._embedded["wp:featuredmedia"][0].media_details.sizes[
            "jnews-750x375"
          ].height,
        alt: post._embedded["wp:featuredmedia"][0].media_details.sizes[
          "jnews-750x375"
        ].alt_text,
      },
      seo: {
        ...post.yoast_head_json,
      },
    })
  );
  return posts;
}

export async function removeLinkCurrentBlog() {
  const content = document.querySelector(".single-content .content");
  if (!content) return;
  const links = content.querySelectorAll("a[href*='https://blog.apiki.com']");
  if (!links) return;

  links.forEach((link) => {
    const slug = link.href.split("/");
    link.href = slug[slug.length - 2];
  });
}
// removeLinkCurrentBlog();
