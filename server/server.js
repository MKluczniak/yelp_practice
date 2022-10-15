// it is going to be our entry point for our backend application so its important file :p creatin and initialazing our express app
//and actualy starting up and listening on some ports we define
require('dotenv').config();  //we are going to require dotenv
console.log(process.env);


const express = require("express"); //importing express app
const morgan = require('morgan'); //importing morgan
const app = express();//creating an instance of our express app // so we created and instance of express an we stored it in a var app

// app.use(morgan("dev"))
app.use(express.json())  //this middleware is going to take whats in the body (retrive the date in the body of request) and we do it with middleware express.json() and it is going to attach it to "req"

//now we need to start building our API plus routs
//get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("route handler run")
      res.status(200).json({      //we can use res.status(404).json to set our own status code and then see that in postman
        status: "succes",
        data: {
            restaurant: ["mcdonalds", "wendys"],
        }
      }) //we can also sned a json object res.json({}) the response will come as a json format and once we build our react the react cli will recieve a json format so he can easli parse the data  //res.send("these are the restaurants") this will send a "res"ponse and write it on the website   //consol log would print in our consol where the server is running
})  // the url parameter is the url the frontend is going to send a http request to, the second parametr (req, res) is the callback function with request & response(we send back) stored

//getting an individual restaurant 

app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params) //console.log(req) i wanna consol log the request object, it will print a big json object in consol where we can find for example "parems: id" so exacly what is our param in our route or better we send   console.log(req.params) we got { id: '1234' } so the id we provided in the url, so now we know which restaurant our user want to retive
    res.status(200).json({
        status: "succes",
        data: {
            restaurant: "mcdonalds"
        }
    })
})
//crete restaureant
app.post("/api/v1/restaurants", (req, res)=> {
    console.log(req.body);
    res.status(201).json({
        status: "succes",
        data: {
            restaurant: "mcdonalds"
        }
    })
})

//update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.status(200).json({
        status: "succes",
        data: {
            restaurant: "mcdonalds"
        }
    })
} )

//delete restaurant

app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success"
    })
})





const port = process.env.PORT || 3001;  //"so we are sorting a variable of port to the value of port in the .env file",   "||" means: however if its not defined we are listening on port 3001
// and now we can tell our express app to listen on a specific port
app.listen(port, () => {       //usualy 3000   // and the second thing is a call-back function, so exencialy once our express server starts up what you want to do?
    console.log(`Server is up and listening on port ${port}`)
})   

// i wanna actually use the env var in our app... its not neces. good to just hardcode port'3005' becouse in dev ok but maybe in prod its not going to be 3005
// there is a package really helpful for managing env variables & its called "dotenv" you can find it on npmjs.com,