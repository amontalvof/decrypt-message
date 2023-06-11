import { decryptMessage } from './decrypt.controller';

import { Server } from '../server';

jest.mock('../server', () => ({
    Server: {
        connection: {
            query: jest.fn(),
        },
    },
}));
describe('decrypt controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should decrypt the message', async () => {
        (Server.connection.query as any).mockResolvedValueOnce('ok');
        const mockJson = jest.fn();
        const req = {
            body: {
                message: 'John000Doe000123',
            },
        } as unknown as Request;
        const res = {
            json: mockJson,
        } as unknown as Response;
        // @ts-ignore
        await decryptMessage(req, res);
        expect(mockJson).toHaveBeenCalledWith({
            ok: true,
            message: {
                first_name: 'John',
                id: '123',
                last_name: 'Doe',
            },
        });
    });
    it('should catch the error', async () => {
        (Server.connection.query as any).mockRejectedValueOnce('error');
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({
            json: mockJson,
        }));
        const req = {
            body: {
                message: 'John000Doe',
            },
        } as unknown as Request;
        const res = {
            status: mockStatus,
        } as unknown as Response;
        // @ts-ignore
        await decryptMessage(req, res);
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            ok: false,
            errors: {
                message: { msg: 'ERROR, Please talk to the administrator.' },
            },
        });
    });
});
