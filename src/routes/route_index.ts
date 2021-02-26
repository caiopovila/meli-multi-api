import * as express from 'express';

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        res.json({
            name: 'mlAPI',
            version: '1.0'
        });
    } catch (error) {
        res.status(500).json(error);        
    }
});

export { route as index };