import React from "react"
import { graphql, Link } from "gatsby"

const BlogList = ({ data }) => {
  const posts = data.allMdx.edges

  return (
    <main>
      <h1>List</h1>
      {posts.map(({ node }) => {
        return (
          <Link key={node.id} to={node.frontmatter.path}>
            {node.frontmatter.title}
          </Link>
        )
      })}
    </main>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          body
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }
`
export default BlogList
