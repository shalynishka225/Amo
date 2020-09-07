const { Router } = require('express');
const config = require('config');

import WorkerController from './worker.controller';
const Worker = require('../models/Worker');
const auth = require('../middleware/auth.middleware');


const router = Router();

router.post('/generate', auth, async (req, res) => {
  return res.json(await WorkerController.generate(req.body));
})

router.get('/',auth, async (res, req) => {
    try {
        const workers = await Worker.find({ owner: req.user.userId});
        res.json(workers);
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" });
    }
})

router.get('/:id',auth, async (res, req) => {
    try {
        const worker = await Worker.findById(req.params.id);
        res.json(worker);
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" });
        }
})

module.exports = router;