const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const Auth = require('./modules/auth/auth.routes');
const Worker = require('./modules/worker/worker.routes');

//import { registerRestEndpoints } from './routes';

const app = express();

//registerRestEndpoints(app);
app.use(express.json({ extended: true }));

app.use('/api/auth', Auth);
app.use('/api/worker', Worker);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

// export const registerRestEndpoints = (app) => {
//     applyMiddlewares(app);

//     app.use('/auth', AuthRoutes);

//     app.use('/auth', WorkerRoutes);
// }

