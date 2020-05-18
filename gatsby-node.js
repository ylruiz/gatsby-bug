const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

const createPosts = (posts, createPage, blogTemplate) => {
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: blogTemplate,
      context: {
        prev: index === posts.length - 1 ? null : posts[index + 1].node,
        next: index === 0 ? null : posts[index - 1].node,
      },
    })
  })
}

const createPagination = (posts, createPage, blogList) => {
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/" : `/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve("src/content/templates/blogTemplate.js")
  const blogList = path.resolve("src/content/templates/blogList.js")

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query {
          postsMdx: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 2000
          ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                  date
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reporter.panicOnBuild(`Error while running GraphQL query.`)
          return
        }

        const posts = result.data.postsMdx.edges
        createPosts(posts, createPage, blogTemplate)

        createPagination(posts, createPage, blogList)

        resolve()
      })
    )
  })
}
