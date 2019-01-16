import React from 'react'
import styled from 'styled-components'

const Body = styled.p`
  margin-top: 0.5em;
  line-height: 1.5em;
`

const Welcome = () => (
  <section>
    <Body>
      Paul Maxson is a web design and web development student. His current
      projects include learning to build intuitive user interfaces and improving
      his functional programming skills.
    </Body>
    <Body>This website hosts his portfolio.</Body>
  </section>
)

export default Welcome
