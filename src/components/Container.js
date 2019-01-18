import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 1rem 1.5rem 1.2rem;
  flex-grow: 1;
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
