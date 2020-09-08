const { Router } = require('express');
const config = require('config');

const WorkerController = require('./worker.controller');
const Worker = require('../worker/worker.model');
const auth = require('../../middleware/auth.middleware');


const router = Router();

router.post('/generate', auth, async (req, res) => {
  return res.json(await WorkerController.generate(req.body));
})

router.post('/generate', auth, async (req, res) => {
    try {

        const baseUrl = config.get('baseUrl');
        const { from } = req.body;

        const code = 'shortid.generate()';

        const existing = await Worker.findOne({ from });

        if (existing) {
            return res.json({ worker: existing})
        }

        const to = baseUrl + '/t/' + code;

        const worker = new Worker({
            code, to, from, owner: req.user.userId
        })

        await worker.save();
        res.status(201).json({ worker });

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" });
    }
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