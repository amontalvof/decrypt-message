import styled from 'styled-components';
import {
    crimson,
    lightBlue,
    mediumBlue,
    mediumWhite,
} from '../../constants/colors';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Input = styled.input`
    width: 80%;
    padding: 12px 20px;
    margin: 0 10px;
    margin: 8px 0;
    display: inline-block;
    border: 3px solid white;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none !important;
    &:focus {
        border: 3px solid ${lightBlue};
    }
`;

export const Button = styled.button<{ isInputEmpty: boolean }>`
    width: 80%;
    background-color: ${lightBlue};
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: ${(props) => (props.isInputEmpty ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${mediumBlue};
    }
`;

export const StyledPre = styled.pre`
    font-size: 16px;
    color: ${mediumWhite};
    margin-top: 30px;
`;

export const ErrorMessage = styled.p`
    color: ${crimson};
    margin-top: 30px;
`;
