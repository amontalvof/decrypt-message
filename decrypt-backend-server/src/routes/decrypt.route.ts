/*
 * Decrypt Routes
 * host + /api/decrypt
 */
import { Router } from 'express';
import { check } from 'express-validator';
import { decryptMessage } from '../controllers/decrypt.controller';
import validateFields from '../middleware/validateFields';

const router = Router();

router.post(
    '/',
    [
        check('message', 'The message is required').not().isEmpty(),
        check(
            'message',
            'The message must be between 1 and 200 characters.'
        ).isLength({ min: 1, max: 200 }),
        check('message', 'The message is not valid.').matches(
            /^([^\d]+)0+([^\d]+)0+(\d+)$/
        ),
        validateFields,
    ],
    decryptMessage
);

export default router;
