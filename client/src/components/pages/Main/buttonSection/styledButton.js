import styled from 'styled-components';

export const StyledButton = styled.button`
    opacity: ${props => !props.isActive ? '1' : '0.2'};
    cursor: ${props => !props.isActive ? 'pointer' : 'not-allowed'};
    width: 220px;
    height: 40px;
    background: rgba(0,0,0, .2);
    color: white;
    font-size: 1.2rem;
    border: 2px green solid;
    border-radius: 6px;
    transform: ${props => props.isLoad ? 'translateX(100px)' : 'translateX(0px)'};
    transition: all 1s;


`

export const StyledButtonLeft = styled(StyledButton)`
transform: ${props => !props.isLoad ? 'translateX(-180px)' : 'translateX(0px)'};
`

export const StyledButtonRight = styled(StyledButton)`
transform: ${props => !props.isLoad ? 'translateX(180px)' : 'translateX(0px)'};
`