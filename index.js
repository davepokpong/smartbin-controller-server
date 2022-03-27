const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")

const app = express()
app.use(cors())

const port = process.env.PORT || 4000

app.get("/start", (req, res) => {
    console.log("Start Bin")
    res.send({ msg: "Start Bin"})
})

app.get("/stop", (req, res) => {
    console.log("Stop Bin")
    res.send({ msg: "Start Bin"})
})

app.get("/speed", (req, res) => {
    console.log("Speed up Bin")
    res.send({ msg: "Start Bin"})
})

app.get("/slow", (req, res) => {
    console.log("Slow down Bin")
    res.send({ msg: "Start Bin"})
})

app.get("/test", (req, res) => {
    let test = req.query.word
    console.log("word: "+ test)
    res.send({ msg: test})
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})