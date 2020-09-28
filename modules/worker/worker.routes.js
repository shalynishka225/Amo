const { Router } = require('express');
//const WorkerController = require('./worker.controller');
const Worker = require('../worker/worker.model');
const auth = require('../auth/auth.middleware');


const router = Router();

// router.post('/generate', auth, async (req, res) => {
//   return res.json(await WorkerController.generate(req.body));
// })

router.post('/generate', auth, async (req, res) => {
    try {
        const { firstName } = req.body;
        const { secondName } = req.body;
        const { thirdName } = req.body;
        const { about } = req.body;
        const { checkTable } = req.body;
        const { avatar } = req.body;
        const { files } = req.body;
        const { workPhoto } = req.body;

        const existing = await Worker.findOne({ firstName });

        if (existing) {
            return res.json({ worker: existing})
        }

        

        const worker = new Worker({
            firstName, secondName, thirdName, checkTable, avatar, files, workPhoto, about, owner: req.user.userId
        });

        await worker.save();
        res.status(201).json({ worker });

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" });
    }
})

router.get('/', auth, async (req, res) => {
    try {
      const workers = await Worker.find({ owner: req.user.userId })
      res.json(workers)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.get('/:id', auth, async (req, res) => {
    try {
      const worker = await Worker.findById(req.params.id)
      res.json(worker)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router;