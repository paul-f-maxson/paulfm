import React from 'react'
import styled from 'styled-components'
require('prismjs/themes/prism.css')

const Body = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  font: ${({ theme }) => theme.fonts.body};

  h1,
  h2,
  h3 {
    font-weight: 600;
    line-height: 1.25;
    margin: 0 0 1rem 0;
    text-transform: capitalize;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.25em;
  }
  h3 {
    font-size: 1em;
  }

  p {
    font: ${({theme}) => theme.fonts.body};
    line-height: 1.6;
    margin: 0 0 2em 0;
  }

  a {
    transition: 0.2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }

  del {
    text-decoration: line-through;
  }
  strong {
    font-weight: 600;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0 0 2em 0;
  }

  ul {
    li {
      list-style: disc;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  ol {
    li {
      list-style: decimal;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  hr {
    border-style: solid;
    border-color: ${props => props.theme.colors.secondary};
    margin: 0 0 2em 0;
  }

  blockquote {
    font-style: italic;
    border-left: 4px solid ${props => props.theme.colors.secondary};
    padding: 0 0 0 0.5em;
  }

  table {
    width: 80%;
    border-collapse: separate;
    border-spacing: 0.5rem;
    .header {
      border-bottom: 1px solid #ccc !important;
    }
  }
`

// Make sure html has been sanitized!
const PageBody = ({ html, children }) => {
  return html ? (
    <Body dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <Body>{children}</Body>
  )
}

export default PageBody
