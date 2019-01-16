import styled from 'styled-components'

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-transform: capitalize;
  font-weight: 500;
  text-align: left;
  margin: 0 0 3rem 0;
  line-height: 1;
  span {
    margin: 0 0 0 0.25em;
  }
  a {
    transition: all 0.2s;
    color: ${props => props.theme.colors.base};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`

export default SectionTitle
