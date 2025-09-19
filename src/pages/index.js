import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Home({ data }) {
  const home = data.contentfulHomepage
  const hero = getImage(home.heroImage)

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>{home.title}</h1>
      <p>{home.subtitle}</p>
      {hero && <GatsbyImage image={hero} alt={home.title} />}
      <section style={{ marginTop: 20 }}>
        {/* ✅ intro.raw is a string, so parse it */}
        {documentToReactComponents(JSON.parse(home.intro.raw))}
      </section>
    </main>
  )
}

export const query = graphql`
  query {
    contentfulHomepage {
      title
      subtitle
      intro {
        raw
      }
      heroImage {
        gatsbyImageData(layout: CONSTRAINED, width: 1200)
      }
    }
  }
`
