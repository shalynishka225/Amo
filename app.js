const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const Auth = require('./modules/auth/auth.routes');
const Worker = require('./modules/worker/worker.routes');
const { cloudinary } = require('./utils/cloudinary');
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

app.get('/api/images', async (req,res) => {
    const { resources } = await cloudinary.search.expression
    ('folder:example')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute()

    const publicIds = resources.map( file => file.public_id)
    res.send(publicIds)
})

app.post('/api/upload', formidable(), async (req, res) => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(req.files.file.path, {
            upload_preset: 'example'
        })
        console.log(uploadedResponse)
        res.json({ url: uploadedResponse.secure_url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: 'Something went wrong' })
    }
})


start();

// export const registerRestEndpoints = (app) => {
//     applyMiddlewares(app);

//     app.use('/auth', AuthRoutes);

//     app.use('/auth', WorkerRoutes);
// }

