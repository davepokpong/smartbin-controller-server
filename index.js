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

app.get("/moving", (req, res) => {
    let state = req.query.state
    console.log("moving state : " + state)
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        if(state === status.moving_status){
            console.log("Already " + state +"!!!")
            return;
        }else{
            status.moving_status = state
            console.log(status)
            res.send(status)
        }
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
    console.log("direction state : " + state)
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        if(state === status.direction_status){
            console.log("Already " + state +"!!!")
            return;
        }else{
            status.direction_status = state
            console.log(status)
            res.send(status)
        }
    } 
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})