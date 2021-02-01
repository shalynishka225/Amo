const {Router} = require("express");
const WorkerController = require("./worker.controller");
const Worker = require("../worker/worker.model");
const auth = require("../auth/auth.middleware");
const User = require("../auth/auth.model");

const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (e) {
        console.log(e);
    }
});

router.get('/pagination', auth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const region = req.query.region;
        const locality = req.query.locality;
        const secondName = req.query.surname;
        let filter = {}
        let total = 0

        if(region !== undefined) {
            filter = { region }
            total = await Worker.find(filter);
        }
        if(locality !== undefined) {
            filter = { locality }
            total = await Worker.find(filter);
        } if(secondName !== undefined) {
            filter = { secondName : {$regex: secondName} }
            total = await Worker.find(filter);
        }
        else {
            total = await Worker.find(filter);
        }

        console.log(region, locality, secondName)
        const worker = await Worker.find(filter).skip(skip).limit(limit);

        return res.status(200).json({worker, total: total.length })

    } catch (e) {
        console.log(e)
    }
})

router.get("/my", auth, async (req, res) => {
    try {
        const worker = await Worker.find({owner: req.user.userId});
        res.json(worker);
    } catch (e) {
        console.log(e);
    }
});


router.get("/:id", auth, async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        res.json(worker);
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
    }
});


router.get("/edit/:id", auth, async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        res.json(worker);
    } catch (error) {
    }
});


router.post("/generate", auth, async (req, res) => {
    try {
        const worker = await WorkerController.generate({
            ...req.body,
            owner: req.user.userId,
        });

        await User.findByIdAndUpdate(req.user.userId, {
            $set: {worker: worker._id},
        });

        res.json({isCreated: true, CardId: worker._id});
        return worker;
    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:id", auth, async (req, res) => {
    try {
        const worker = await Worker.findByIdAndUpdate(req.params.id, req.body);
        res.json(worker);
    } catch (error) {
        console.log(error);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const worker = await Worker.findByIdAndDelete(req.params.id);
        res.status(200);
        res.json(worker);
    } catch (error) {
        console.log("При удалении анкеты произошла ошибка");
    }
});


module.exports = router;
