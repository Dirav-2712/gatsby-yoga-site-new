import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Classes({ data }) {
  const classes = data.allContentfulYogaClass.nodes;
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Classes</h1>
      {classes.map(c => {
        const img = getImage(c.image);
        return (
          <article key={c.slug} style={{ borderBottom: "1px solid #eee", paddingBottom: 18, marginBottom: 18 }}>
            <h2>{c.title}</h2>
            <p><strong>Schedule:</strong> {c.schedule}</p>
            {img && <GatsbyImage image={img} alt={c.title} />}
            <div>{documentToReactComponents(JSON.parse(c.description.raw))}</div>
            {c.videoUrl && <iframe title={c.title} src={convertToEmbed(c.videoUrl)} width="560" height="315" frameBorder="0" allowFullScreen style={{ marginTop: 12 }} />}
          </article>
        )
      })}
    </main>
  )
}

function convertToEmbed(url) {
  if(!url) return "";
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_\-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export const query = graphql`
  query {
    allContentfulYogaClass(sort: {title: ASC}) {
      nodes {
        title
        slug
        schedule
        videoUrl
        image { gatsbyImageData(width: 800) }
        description { raw }
      }
    }
  }
`
