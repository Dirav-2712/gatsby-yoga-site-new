import React from "react"
import { graphql, Link } from "gatsby"

export default function Blog({ data }) {
  const posts = data.allContentfulBlogPost.nodes;
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li key={p.slug} style={{ marginBottom: 12 }}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
            <div style={{ fontSize: 13, color: "#666" }}>{p.publishDate}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const query = graphql`
  {
    allContentfulBlogPost(sort: {fields: publishDate, order: DESC}) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM D, YYYY")
      }
    }
  }
`
