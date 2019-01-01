import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: -2em auto 0;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 0 1.5em 2em;
  a {
    background: ${props => props.theme.colors.base};
    color: white;
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
      background: ${props => props.theme.colors.highlight};
    }
  }
`;

export default Button;
