import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) =>
        justifyContent};

  ${
    '' /* Set the passed value as the margin along the major axis on children. */
    }

  > * {
    margin: ${({ spaceBetweenKids, col }) =>
        col
            ? `${spaceBetweenKids} 0 ${spaceBetweenKids} 0`
            : `0 ${spaceBetweenKids} 0 ${spaceBetweenKids}`};
  }
`;

export default Flex