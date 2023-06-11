import { useState } from 'react';
import useDecrypt from '../../hooks/useDecrypt';
import Spinner from '../Spinner';
import {
    Button,
    Container,
    ErrorMessage,
    Input,
    StyledPre,
} from './formStyles';

const Form = () => {
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { mutate, isLoading } = useDecrypt();
    const isInputEmpty = encryptedMessage === '';

    const handleSubmit = () => {
        mutate(encryptedMessage, {
            onSuccess: (resp) => {
                console.log(resp);
                setEncryptedMessage('');
                if (resp.ok) {
                    setErrorMessage('');
                    setDecryptedMessage(resp.message);
                } else {
                    setErrorMessage(resp.errors.message.msg);
                    setDecryptedMessage(null);
                }
            },
            onError: (error) => {
                console.error(error);
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage('Failed decrypting message.');
                }
            },
        });
    };

    return (
        <Container>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Enter encrypted message"
                        value={encryptedMessage}
                        onChange={(e) => setEncryptedMessage(e.target.value)}
                        maxLength={200}
                    />
                    <Button
                        id="decryptButton"
                        onClick={handleSubmit}
                        disabled={isInputEmpty}
                        isInputEmpty={isInputEmpty}
                    >
                        Decrypt
                    </Button>
                </>
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {!errorMessage && !isLoading && decryptedMessage && (
                <StyledPre>
                    {JSON.stringify(decryptedMessage, null, 4)}
                </StyledPre>
            )}
        </Container>
    );
};

export default Form;
