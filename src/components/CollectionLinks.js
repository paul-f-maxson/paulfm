import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Button } from './'

const Wrapper = styled.div`
  margin: -2em 0 0 0;
  padding: 0 1.5em 2em;
`

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: auto;
  order: 2;
`

const CollectionLinks = ({ previous, next, collectionItemName }) => {
  return (
    <Wrapper>
      <Button>
        {previous && (
          <PreviousLink to={`/${previous.slug}/`}>
            &#8592; Prev {collectionItemName}
          </PreviousLink>
        )}
        {next && (
          <NextLink to={`/${next.slug}/`}>
            Next {collectionItemName} &#8594;
          </NextLink>
        )}
      </Button>
    </Wrapper>
  )
}

export default CollectionLinks
