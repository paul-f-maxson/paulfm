import React from 'react'
import styled from 'styled-components'
import { Button } from './'
import {LinkExternal} from 'styled-icons/boxicons-regular/LinkExternal'

const Wrapper = styled.nav`
  display: flex;
  margin: 2em 0 -4em 0;
  padding: 0 1.5em 2em;
`

const PieceButton = styled(Button)`
  margin-right: auto;
  order: 1;
`

const AppButton = styled(Button)`
  margin-left: auto;
  order: 2;
`
const ContentLinks = ({ pieceLink, repoLink }) => (
  <Wrapper>
    <PieceButton>
      <a href={`${pieceLink}`}>
        App <LinkExternal title="app-link" size="25" />
      </a>
    </PieceButton>
    <AppButton>
      <a href={`${repoLink}`}>
        Repo <LinkExternal title="repo-link" size="25" />
      </a>
    </AppButton>
  </Wrapper>
)

export default ContentLinks
