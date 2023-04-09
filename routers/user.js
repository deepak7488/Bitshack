const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth.js')
const router = new express.Router();

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthTokens();
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})
router.get('/users', async (req, res) => {
    var data = await User.find({});
    res.send(data)

})
router.get('/users/me', auth, async (req, res) => {
    await req.user.populate('done_questions._id')
    res.send(req.user)
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthTokens();
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()
    }
})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(x => x.token != req.token)
        await req.user.save();
        res.send("Successfully logout!")
    } catch (e) {
        res.status(500).send(e);
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send("Successfully logout!")
    } catch (e) {
        res.status(500).send(e);
    }
})
router.post('/users/:id', auth, async (req, res) => {
    try {
        console.log(req.user.done_questions)
        if (req.user.done_questions.indexOf({ _id: req.params.id }) === -1) {
            console.log("HELLO")
            req.user.done_questions.push({ _id: req.params.id })
            await req.user.save();
        }
        else
            console.log("Already Present")
        console.log("Successfully Added")
        res.status(200).send({ msg: "Successfully Added" })
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
})
router.post('/users/del/:id', auth, async (req, res) => {
    try {
        var index = req.user.done_questions.indexOf({ _id: req.params.id });
        if (index !== -1) {
            req.user.done_questions.splice(index, 1);
            await req.user.save();
        }
        console.log(req.user.done_questions)
        console.log("Successfully Removed")
        res.status(200).send({ msg: "Successfully Removed" })
    } catch (e) {
        res.status(500).send(e);
    }
})
// router.post('/users/logoutAll', async (req, res) => {
//     try {
//         req.user.tokens = [{ token: req.token.toString() }]
//         await req.user.save();
//         res.send("Succesfully logout from all devices except this device!")
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })
// router.get('/users/me', async (req, res) => {
//     try {
//         res.send({ user: req.user })
//     } catch (e) {
//         res.send(e)
//     }
// })
// router.patch('/users/me', async (req, res) => {
//     const Update = Object.keys(req.body)
//     const allowedUpadtes = ['age', 'name', 'password', 'email']
//     const isValidOperation = Update.every((update) => allowedUpadtes.includes(update))
//     const _id = req.user._id;
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid Updates!' })
//     }
//     try {
//         Update.forEach((update) => req.user[update] = req.body[update]) //automaticaly runValidators
//         await req.user.save()
//         return res.send(req.user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         sendCancelemail(req.user.email, req.user.name);
//         // const user = await User.findByIdAndDelete(req.user._id)
//         // if (!user) {
//         //     return res.status(404).send("User not find to delete")
//         // }
//         res.send({ user: req.user })
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
// avatar = multer({
//     //dest: 'avatar',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // 
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('File must be images'))
//         }
//         // console.log(file)
//         cb(undefined, true)
//         // cb(undefined,false)
//     }
// })
// const myerrormiddle = (req, res, next) => {
//     throw new Error("Hello Baby")
// }
// // 
// router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({
//         width: 250,
//         height: 250
//     }).png().toBuffer()
//     req.user.avatar = buffer
//     await req.user.save()
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
// })
// router.delete('/users/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined
//     await req.user.save();
//     res.send();
// })
// router.get('/users/:id/avatar', async (req, res) => {
//     try {
//         const user = await User.findById({ _id: req.params.id })
//         if (!user || !user.avatar) {
//             throw new Error()
//         }
//         res.set('Content-Type', 'image/png');
//         res.send(user.avatar)
//     } catch (e) {
//         res.status(404).send()
//     }
// })
module.exports = router