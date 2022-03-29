const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")

const app = express()
app.use(cors())

//speed 0 100 150 200

const status = { //stop
    moving_status: 0,
    speed_status: 0,
    alert: "",
    left: 0,
    right: 0
}

const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    console.log("Get status")
    res.send(status)
})

app.get("/moving", (req, res) => {
    let state = parseInt(req.query.state)
    let setspeed = parseInt(req.query.setspeed)
    console.log("moving state : " + state)
    if (setspeed){
        console.log("speed : "+ setspeed)
    }
    // console.log(status.moving_status)
    if (state === undefined){
        return ;
    }else{
        if(state === status.moving_status){
            if (state != 0){
                console.log("Stop")
                status.alert = ""
                status.moving_status = 0
                status.speed_status = 0
                status.left = 0
                status.right = 0
            }
            console.log(status)
            return;
        }else{
            if (state != 0){
                // status.speed_status = setspeed
            }else{
                status.speed_status = 0
                status.left = 0
                status.right = 0
            }
            status.moving_status = state
            status.alert = ""
            console.log(status)
            res.send(status)
        }
    } 
})

app.get("/setspeed", (req, res) => {
    let state = req.query.state
    let spd = parseInt(req.query.spd)
    // console.log(status.moving_status)
    if (spd){
        console.log("Set speed to "+ spd)
        if (spd === status.speed_status){
            console.log("Speed is already "+spd)
            return;
        }else{
            status.speed_status = spd
            console.log(status)
        }
    }else{
        if (state === undefined){
            return ;
        }else{
            if (state === "increase" && status.speed_status<200){
                console.log("Speeding up")
                status.speed_status += 50 
                status.alert = ""
            }else if (state === "increase" && status.speed_status===200){
                console.log("Already max speed")
                status.alert = "Already max speed"
            }else if (state === "decrease" && status.speed_status>100){
                console.log("Slowing Down")
                status.speed_status -= 50 
                status.alert = ""
            }else if (state === "decrease" && status.speed_status===100){
                console.log("Already min speed")
                status.alert = "Already min speed"
            }else{
                return;
            }
            console.log(status)
            res.send(status)
        } 
    }
})

app.get("/turn", (req, res) => {
    let left = parseInt(req.query.left)
    let right = parseInt(req.query.right)
    console.log("left: " + left + " Right: " + right)
    if (left === undefined || right === undefined){return}
    else{
        if (left === 1 && right === 0){
            status.left = 1
        }else if (left === 0 && right === 1){
            status.right = 1
        }else if (left ===0 && right === 0){
            status.left = 0
            status.right = 0
        }
    }
    console.log(status)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})