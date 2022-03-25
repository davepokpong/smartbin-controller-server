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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})