const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const Auth = require('./modules/auth/auth.routes');
const Worker = require('./modules/worker/worker.routes');
const { cloudinary } = require('./utils/cloudinary');
const { json } = require('express');
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
      useCreateIndex: true,
    });
    console.log(mongoose.models.Worker);
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

app.post('/api/upload/works', formidable(), async (req, res) => {
  try {
    const uploadWorksFiles = await Promise.all(
      Object.values(req.files).map((file) =>
        cloudinary.uploader.upload(file.path, { upload_preset: 'example' })
      )
    );
    res.json(uploadWorksFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Произошла ошибка в загрузке фотографий' });
  }
});

app.post('/api/upload/certificates', formidable(), async (req, res) => {
  try {
    const uploadWorksFiles = await Promise.all(
      Object.values(req.files).map((file) =>
        cloudinary.uploader.upload(file.path, {
          eager: [{ flags: 'attachment:my_pdf' }],
          upload_preset: 'example',
        })
      )
    );
    console.log(uploadWorksFiles[0].eager);
    res.json(uploadWorksFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Произошла ошибка в загрзуке файлов' });
  }
});

app.post('/api/upload/avatar', formidable(), async (req, res) => {
  try {
    const uploadedResponce = await cloudinary.uploader.upload(
      req.files.avatar.path,
      { upload_preset: 'example' }
    );
    res.json(uploadedResponce);
  } catch (error) {
    console.log(error);
  }
});

start();

// export const registerRestEndpoints = (app) => {
//     applyMiddlewares(app);

//     app.use('/auth', AuthRoutes);

//     app.use('/auth', WorkerRoutes);
// }
