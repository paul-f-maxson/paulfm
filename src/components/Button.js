import styled from 'styled-components'

const Button = styled.a`
    background: ${props => props.theme.colors.base};
    color: white;
    padding: ${({padding}) => padding || '1rem'};
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
        background: ${props => props.theme.colors.highlight};
`

export default Button
