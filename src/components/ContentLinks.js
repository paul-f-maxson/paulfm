import React from 'react'
import styled from 'styled-components'
import { ButtonBar } from './'
import { LinkExternal } from 'styled-icons/boxicons-regular/LinkExternal'

const Wrapper = styled.div`
  margin: 2em 0 -3em 0;
  padding: 0 1.5em 2em;
`

const PieceAnchor = styled.a`
  margin-right: auto;
  order: 1;
`

const AppAnchor = styled.a`
  margin-left: auto;
  order: 2;
`

const ContentLinks = ({ pieceLink, repoLink }) => (
  <Wrapper>
    <ButtonBar>
      <PieceAnchor
        href={`${pieceLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        App <LinkExternal title="app-link" size="25" />
      </PieceAnchor>
      <AppAnchor href={`${repoLink}`} target="_blank" rel="noopener noreferrer">
        Repo <LinkExternal title="repo-link" size="25" />
      </AppAnchor>
    </ButtonBar>
  </Wrapper>
)

export default ContentLinks
