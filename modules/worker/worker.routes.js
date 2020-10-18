const { Router } = require('express');
const WorkerController = require('./worker.controller');
const Worker = require('../worker/worker.model');
const auth = require('../auth/auth.middleware');


const router = Router();


router.post('/generate', auth, async (req, res) => {
  try {
    return res.json(await WorkerController.generate(req.body));
  } catch (error) {
    console.log(error)
  }
})
  


router.get('/', auth, async (req, res) => {
    try {
      const workers = await Worker.find()
      res.json(workers)
    } catch (e) {
      console.log(e)
    }
  })


router.get('/my', auth, async (req, res) =>{
  try {
    console.log(req.user)
    const workers = await Worker.find({ owner: req.user.userId })
    //console.log(res)
    res.json(workers)
  } catch (e) {
    console.log(e)
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