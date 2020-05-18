import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BlogTemplate = ({ data }) => {
  const { frontmatter, body } = data.mdx

  return (
    <main>
      <header>
        <h1>{frontmatter.title}</h1>
      </header>
      <section className="post-content">
        <MDXRenderer>{body}</MDXRenderer>
      </section>
    </main>
  )
}

export const query = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export default BlogTemplate
