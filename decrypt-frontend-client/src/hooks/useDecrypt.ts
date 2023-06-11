import { useMutation } from 'react-query';
import { baseUrl } from '../constants/url';

const decryptMessage = async (message: string) => {
    const resp = await fetch(`${baseUrl}/decrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });
    return await resp.json();
};

const useDecrypt = () => {
    return useMutation(decryptMessage);
};

export default useDecrypt;
