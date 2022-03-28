const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")

const app = express()
app.use(cors())

//speed 0 100 150 200

const status = {
    moving_status: 0,
    speed_status: 0,
    alert: ""
}

const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    console.log("Get status")
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
            status.alert = "Already " + state +"!!!"
            console.log(status)
            return;
        }else{
            if (state === 0){
                status.speed_status = 0
            }else{
                status.speed_status = 100
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
    // console.log(status.moving_status)
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
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})