import styled from 'styled-components';
import { lightBlack, lightWhite, mediumWhite } from '../constants/colors';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${lightBlack};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Card = styled.div`
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 46px;
    background: linear-gradient(145deg, #252525, #2c2c2c);
    box-shadow: 17px 17px 35px #1e1e1e, -17px -17px 35px #343434;
`;

export const Title = styled.h1`
    color: ${lightWhite};
    font-size: 20px;
    margin: 25px 0 5px;
`;

export const Subtitle = styled.h2`
    color: ${mediumWhite};
    font-size: 16px;
    margin: 0 0 25px;
`;
