import { CSSProperties } from 'react';
import { Container } from './spinnerStyles';

const Spinner = ({ style }: { style: CSSProperties }) => {
    return <Container style={style}></Container>;
};

export default Spinner;
