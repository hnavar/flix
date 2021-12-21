import {Router} from 'express';
import axios from 'axios';
// import type {Request, Response} from 'express';
const {addUser} = require('../database/index');
const UsersRouter = Router();

UsersRouter.post('/', (req: any, res: any) => {
    console.log(req.body);
    addUser(req.body)
        .then(() => {
            console.log('success');
            res.sendStatus(200);
        })
        .catch((err: any) => {
            console.log('error')
        })
})



//check if user exists



export default UsersRouter;