import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const CardStyle = styled.li`
  position: relative;
  border: 1px solid ${props => props.theme.colors.tertiary};
  border-radius: 2px;
  margin: 0 0 1em 0;
  width: 100%;
  transition: background 0.2s;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: ${props => (props.featured ? '0 0 100%' : '0 0 49%')};
    margin: 0 0 2vw 0;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    flex: ${props => (props.featured ? '0 0 100%' : '0 0 32%')};
  }
  &:hover {
    background: ${props => props.theme.colors.tertiary};
  }
  a {
    display: flex;
    flex-flow: column;
    color: black;
    height: 100%;
    width: 100%;
    text-decoration: none;
    .gatsby-image-wrapper {
      height: 0;
      padding-bottom: 60%;
      @media screen and (min-width: ${props => props.theme.responsive.small}) {
        padding-bottom: ${props => (props.featured ? '40%' : '60%')};
      }
    }
  }
`

const Title = styled.h2`
  font: ${({theme}) => theme.fonts.secondary};
  color: ${({theme}) => theme.colors.base};
  ${'' /* color: #0f8980; */}
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`

const Date = styled.h3`
  margin: 0 1rem 1.5rem 1rem;
  color: gray;
`

const Excerpt = styled.p`
  margin: 0 1rem 1rem 1rem;
  line-height: 1.6;
`

const Card = ({ linkSlug, image, title, date, body, ...props }) => (
  <CardStyle featured={props.featured}>
    <Link to={`/${linkSlug}/`}>
      <Img fluid={image.fluid} backgroundColor={'#eeeeee'} />
      <Title>{title}</Title>
      <Date>{date}</Date>
      <Excerpt>{body}</Excerpt>
    </Link>
  </CardStyle>
)

export default Card
