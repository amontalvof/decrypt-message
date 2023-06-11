import Form from '../components/Form';
import { Card, Container, Subtitle, Title } from './homeStyles';

const Home = () => {
    return (
        <Container>
            <Card>
                <Title>Tech challenge for Fullstack Devs</Title>
                <Subtitle>by Andy Montalvo Fernandez</Subtitle>
                <Form />
            </Card>
        </Container>
    );
};

export default Home;
