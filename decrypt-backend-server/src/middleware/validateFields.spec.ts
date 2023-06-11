import { Request, Response } from 'express';
import expressValidator from 'express-validator';
import validateFields from './validateFields';

jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('validateFields', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call next without errors', () => {
        const req = {} as Request;
        const res = {} as Response;
        const mockNext = jest.fn();
        const mockIsEmpty = jest.fn(() => true);
        const mockMapped = jest.fn();
        (expressValidator.validationResult as any).mockReturnValue({
            isEmpty: mockIsEmpty,
            mapped: mockMapped,
        });
        validateFields(req, res, mockNext);
        expect(expressValidator.validationResult).toHaveBeenCalledWith(req);
        expect(mockIsEmpty).toHaveBeenCalled();
        expect(mockMapped).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should call mapped with errors', () => {
        const mockNext = jest.fn();
        const mockIsEmpty = jest.fn(() => false);
        const mockMapped = jest.fn(() => 'errors mapped');
        const mockJson = jest.fn();
        const mockStatus = jest.fn(() => ({
            json: mockJson,
        }));
        const req = {} as Request;
        const res = {
            status: mockStatus,
        } as unknown as Response;
        (expressValidator.validationResult as any).mockReturnValue({
            isEmpty: mockIsEmpty,
            mapped: mockMapped,
        });
        validateFields(req, res, mockNext);
        expect(expressValidator.validationResult).toHaveBeenCalledWith(req);
        expect(mockIsEmpty).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockMapped).toHaveBeenCalled();
        expect(mockJson).toHaveBeenCalledWith({
            ok: false,
            errors: 'errors mapped',
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
