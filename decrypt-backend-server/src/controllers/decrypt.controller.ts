import { Request, Response } from 'express';
import { Server } from '../server';

export const decryptMessage = async (
    req: Request,
    res: Response
): Promise<Response | void> => {
    try {
        const { message } = req.body;
        const [first_name, last_name, id] = message.split(/0+/).filter(Boolean);
        const newMessage = {
            first_name,
            last_name,
            message_id: id,
        };
        const conn = Server.connection;
        await conn.query('INSERT INTO messages SET ?', [newMessage]);
        return res.json({
            ok: true,
            message: { first_name, last_name, id },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            errors: {
                message: { msg: 'ERROR, Please talk to the administrator.' },
            },
        });
    }
};
