import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

export default () => (
  <StaticQuery
    query={indexQuery}
    render={data => {
      const { edges } = data.allMdx
      const posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => (
          <Link key={edge.node.id} to={edge.node.frontmatter.path}>
            {edge.node.frontmatter.title}
          </Link>
        ))

      return <main>{posts}</main>
    }}
  />
)

const indexQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 6) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
