import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function BlogPost({ data }) {
  const post = data.contentfulBlogPost
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>{post.title}</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>{post.publishDate}</div>
      <article>{documentToReactComponents(JSON.parse(post.body.raw))}</article>
    </main>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM D, YYYY")
      body { raw }
    }
  }
`
