import React from 'react'
import { graphql } from 'gatsby'

// GraphQL 获取的数据，会当做参数传递到页面组件中
// 数据的形式是 { errors, data }，没有错误则不会有 errors
const About = ({ data }) => {
  return (
    <>
      <h1>Title: {data.site.siteMetadata.title}</h1>
      <p>author: {data.site.siteMetadata.author}</p>
      <div>about me</div>
    </>
  )
}

export default About

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`