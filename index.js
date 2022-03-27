const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")

const app = express()
app.use(cors())

const status = {
    moving_status: "stop",
    speed_status: 0,
    direction_status: "forward"
}

const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    console.log(status)
    res.send(status)
})

app.get("/start", (req, res) => {
    console.log("Start Bin")
    if (status.moving_status === "start"){
        return;
    }else{
        let update = axios.get("https://smart-bin-controller-server.herokuapp.com/moving?state=start")
        console.log(status)
        res.send({ msg: "Start Bin"})
    } 
})

app.get("/stop", (req, res) => {
    console.log("Stop Bin")
    if (status.moving_status === "stop"){
        return;
    }else{
        let update = axios.get("https://smart-bin-controller-server.herokuapp.com/moving?state=stop")
        console.log(status)
        res.send({ msg: "Stop Bin"})
    } 
})

// app.get("/speed", (req, res) => {
//     console.log("Speed up Bin")
//     if (status.moving_status === "stop"){
//         return;
//     }else{
//         let update = axios.get("https://smart-bin-controller-server.herokuapp.com/setspeed?speed=stop")
//         console.log(status)
//         res.send({ msg: "Speed up Bin"})
//     } 
// })

// app.get("/slow", (req, res) => {
//     console.log("Slow down Bin")
//     res.send({ msg: "Start Bin"})
// })

app.get("/moving", (req, res) => {
    let state = req.query.state
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        status.moving_status = state
        res.send(status)
    } 
})

app.get("/setspeed", (req, res) => {
    let state = req.query.state
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        status.speed_status = state
        res.send(status)
    } 
})

app.get("/direction", (req, res) => {
    let state = req.query.state
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        status.direction_status = state
        res.send(status)
    } 
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})