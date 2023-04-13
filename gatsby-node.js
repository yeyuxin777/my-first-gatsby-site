'use strict'
const { resolve } = require('path')
const { paginate } = require('gatsby-awesome-pagination')
const { defaultLanguage } = require('./languages')
const moment = require('moment')
const { createFilePath } = require('gatsby-source-filesystem')

const formatEndsPath = (path) => (path?.endsWith('/') ? path : `${path}/`)
const formatStartsPath = (path) => (path?.startsWith('/') ? path : `/${path}`)

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const { relativeDirectory, name, sourceInstanceName } = getNode(node.parent)
    let slug = ''
    switch (relativeDirectory) {
      case 'clinical-papers':
        break
      case 'join-us':
        slug = `/about-us/${relativeDirectory}/${node.id}`
        break
      case 'terms-and-conditions':
        slug = `/terms-and-conditions/${
          node.frontmatter.slug === 'terms-and-conditions'
            ? ''
            : node.frontmatter.slug || node.frontmatter.title?.trim() || name
        }`
        break
      case 'health-tips':
        slug = node.frontmatter.postType
          ? `/whats-new/campaign/${relativeDirectory}/${
              node.frontmatter.slug || node.frontmatter.cpTitle?.trim() || name
            }`
          : `/whats-new/${relativeDirectory}/${node.frontmatter.slug || node.frontmatter.title?.trim() || name}`
        break
      case 'promotions':
      case 'updates':
        slug = `/whats-new/${relativeDirectory}/${node.frontmatter.slug || node.frontmatter.title?.trim() || name}`
        break
      case 'campaign-page-posts':
        slug = `/whats-new/campaign/${relativeDirectory}/${
          node.frontmatter.slug || node.frontmatter.title?.trim() || name
        }`
        break
      default:
        if (process.env.GATSBY_ENV === 'development' && sourceInstanceName === 'docs') {
          const value = createFilePath({ node, getNode })
          slug = value
        }
        break
    }

    slug &&
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  // createRedirect({ fromPath: "/*", toPath: "/zh-HK/*", isPermanent: true, statusCode: 300 })
  createRedirect({ fromPath: '/', toPath: '/zh-HK/', isPermanent: true, redirectInBrowser: true })

  const careers = await graphql(`
    {
      allMdx(filter: { fields: { slug: { regex: "/join-us/" } } }, sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
        }
      }
    }
  `)

  if (careers.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)
  const joinUsComponent = resolve(__dirname, 'src/templates/JoinUs.js')
  paginate({
    createPage, // The Gatsby `createPage` function
    items: careers?.data?.allMdx?.nodes || [], // An array of objects
    itemsPerPage: 5, // How many items you want per page
    pathPrefix: '/about-us/join-us/', // Creates pages like `/blog`, `/blog/2`, etc
    component: joinUsComponent, // Just like `createPage()`
  })

  const allMdxQuery = await graphql(`
    {
      allMdx(limit: 1000, filter: { frontmatter: { hide: { ne: true } } }) {
        nodes {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
          internal {
            contentFilePath
          }
          frontmatter {
            languages
            date
          }
        }
      }
    }
  `)

  if (allMdxQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

  const postTemplate = resolve(__dirname, 'src/templates/Post.js')
  const tAndCTemplate = resolve(__dirname, 'src/templates/T&C.js')
  const careerTemplate = resolve(__dirname, 'src/templates/Career.js')

  const allMdxList = allMdxQuery.data.allMdx.nodes

  allMdxList?.forEach((mdx) => {
    let path = mdx.fields?.slug
    if (!path) return
    // if (
    //   mdx.parent.relativeDirectory === 'health-tips' ||
    //   mdx.parent.relativeDirectory === 'promotions' ||
    //   mdx.parent.relativeDirectory === 'updates' ||
    //   mdx.parent.relativeDirectory === 'campaign-page-posts'
    // )
    //   return
    let component = null,
      defer = false

    switch (mdx.parent.relativeDirectory) {
      case 'terms-and-conditions':
        component = `${tAndCTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      case 'join-us':
        component = `${careerTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      default:
        component = `${postTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = moment(mdx?.frontmatter?.date)?.isBefore('2021-12-31')
        break
    }

    mdx?.frontmatter?.languages?.forEach((lang) => {
      // if (lang === defaultLanguage) {
      //   createPage({
      //     path: `${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `${path}`,
      //     },
      //     // defer,
      //   })
      //   createRedirect({
      //         fromPath: `/${lang}${path}`,
      //         // redirectInBrowser: true,
      //         isPermanent: true,
      //         toPath: path,
      //   })
      // }
      // else {
      //   createPage({
      //     path: `/${lang}${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `/${lang}${path}`,
      //     },
      //     // defer,
      //   })
      // }

      createPage({
        path: `/${lang}${path}`,
        component,
        context: {
          slug: path,
          sectionPath: mdx.parent.relativeDirectory,
          regex: `/${mdx.parent.relativeDirectory}/`,
          id: mdx.id,
          contentFilePath: mdx.internal.contentFilePath,
          curPath: `/${lang}${path}`,
        },
        // defer,
      })
      // if (lang === defaultLanguage)
      //   createPage({
      //     path,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: path,
      //     },
      //     // defer,
      //   })
      if (lang === defaultLanguage)
        createRedirect({
          fromPath: path,
          // redirectInBrowser: true,
          isPermanent: true,
          toPath: `/${lang}${path}`,
        })
    })
  })

  // For development env to show doc pages
  if (process.env.GATSBY_ENV === 'development') {
    const allDocQuery = await graphql(`
      {
        allMdx(limit: 1000, filter: { internal: { contentFilePath: { regex: "/docs/" } } }) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
    if (allDocQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

    const docTemplate = resolve(__dirname, 'src/templates/Doc.js')
    const allDocList = allDocQuery.data.allMdx.nodes
    allDocList?.forEach((node) => {
      let slug = node?.fields?.slug
      if (!slug) return
      createPage({
        path: `/docs${slug}`,
        component: `${docTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug,
        },
      })
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      region: String!
    }
  `
  createTypes(typeDefs)
}
