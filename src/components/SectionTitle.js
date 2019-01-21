import styled from 'styled-components'

const SectionTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.primary};
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${props => props.theme.colors.secondary};
  text-align: left;
  margin: 0 0 1.2rem 0;
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
