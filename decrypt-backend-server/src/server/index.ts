import express, { Application } from 'express';
import { Pool } from 'mysql2/promise';
import cors from 'cors';
import colors from 'colors/safe';

import { connect } from '../db/connection';
import decryptRoute from '../routes/decrypt.route';

export class Server {
    static connection: Pool;
    private app: Application;
    private port: string;
    private paths = {
        decrypt: '/api/decrypt',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        Server.connection = await connect();
    }

    private middlewares() {
        // CORS
        this.app.use(cors());
        // reading and parsing the body
        this.app.use(express.json());
        // public directory
        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use(this.paths.decrypt, decryptRoute);
    }

    async listen() {
        await this.app.listen(this.port);
        console.log(colors.cyan(`Server running on port: ${this.port}`));
    }
}
