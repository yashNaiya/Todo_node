const express = require("express");
const app = express();
var mongoose = require('mongoose');
require("./connection/Connection")
const dotenv = require('dotenv');
const Users = require("./models/Users");
const PORT = process.env.PORT || 9002
app.use(express.json())

var cors = require('cors')
const origin = ["http://localhost:3000"]
app.use(cors({
    credentials: true,
    origin: origin,
    methods: ["GET", "POST"],
    preflightContinue: true,
}));

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Be Started at port ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.status(234).send("on home page")
})


app.post("/register", async (req, res) => {
    // console.log(req.body)
    const { name, email, password, number } = req.body
    // res.send(name)

    const user = await Users.findOne({ email: email })
    if (user) {
        res.send({ message: "User Already Registered" })
    }
    else {
        const user2 = await Users.findOne({ number: number })
        if (user2) {
            res.send({ message: "User Already Registered" })
        }
        else {
            const user = new Users({
                name: name,
                number: number,
                email: email,
                password: password,
                list: [],
            })
            user.save()
                .then(() => {
                    res.status(200).send({ message: "Successfully Registration" })
                })
                .catch(err => {
                    res.send(err)
                })
        }

    }

})

app.post('/login', (req, res) => {

    //  console.log(req.body)
    const { email, password } = req.body
    Users.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                console.log("login succesful")
                res.status(200).send({ user: user, message: "login succesful" })
            } else {
                res.status(404).send({ message: "user not found" })
            }
        }).catch(err => {
            res.send(err)
        })
})

app.post('/addToList', (req, res) => {
    console.log(req.body);
    if (req.body.userId) {
        Users.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.userId) }, { $push: { list: { title: "item", detail: req.body.data.detail } } })
            .then(user => {
                
            })
            .catch(err => {
                res.send(err)
            })
    }
    res.send()
})

app.post('/removeFromList',(req,res)=>{
    const {userId, detail} = req.body;
    Users.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { $pull: { list: { title: "item", detail:detail } } })
    .then(user => {
        
    })
    .catch(err => {
        res.send(err)
    })
    res.send()
})