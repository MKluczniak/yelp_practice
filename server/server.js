// it is going to be our entry point for our backend application so its important file :p creatin and initialazing our express app
//and actualy starting up and listening on some ports we define
require('dotenv').config();  //we are going to require dotenv
// console.log(process.env);
const db = require('./db') //we dont need to use ./db/index.js  | so now we have access to the db objct

const cors = require("cors")
const express = require("express"); //importing express app
const morgan = require('morgan'); //importing morgan
const app = express();//creating an instance of our express app // so we created and instance of express an we stored it in a var app


app.use(cors())
// app.use(morgan("dev"))
app.use(express.json())  //this middleware is going to take whats in the body (retrive the date in the body of request) and we do it with middleware express.json() and it is going to attach it to "req"


//now we need to start building our API plus routs
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("select * from restaurants") //this is going to return a promise becouse it takes certain amount of time so when we are dealing with promises i rec to use async await syntax
        res.status(200).json({      //we can use res.status(404).json to set our own status code and then see that in postman
        status: "succes",
        results: results.rows.length, //for API if you return a list of sth it is always a good practice to add an extra property to our json response basicly listing how many results we are going to return
        data: {
            restaurants: results.rows, //we use rowes because that where the date is stored if you consol log results
        },
      }); //we can also send a json object res.json({}) the response will come as a json format and once we build our react the react cli will recieve a json format so he can easli parse the data  //res.send("these are the restaurants") this will send a "res"ponse and write it on the website   //consol log would print in our consol where the server is running
    } catch (err){
        console.log(err);
    }
    })  // the url parameter is the url the frontend is going to send a http request to, the second parametr (req, res) is the callback function with request & response(we send back) stored

//getting an individual restaurant 

app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id) //console.log(req) i wanna consol log the request object, it will print a big json object in consol where we can find for example "parems: id" so exacly what is our param in our route or better we send   console.log(req.params) we got { id: '1234' } so the id we provided in the url, so now we know which restaurant our user want to retive
     
    try{
        const restaurant = await db.query("select * from restaurants where id=$1", [
            req.params.id,
        ]);
        // console.log(results)

        const reviews = await db.query("select * from reviews where restaurant_id=$1", [
            req.params.id, 
        ]);

        
 
        res.status(200).json({ //sending data back to front end, when we changed to the restaurant and revies (from response) we need to make change in front end bc we are getting data in slightl different format
            status: "succes",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows  
            },
        })
    }
    catch (err) {
        console.log(err);
    }
})
//create restaureant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1,$2,$3) returning * ", [req.body.name, req.body.location, req.body.price_range])
        // console.log(req.body);    //and because we hava a middleware the  const app = express();  all the fields that are i the request body (done in postman), will get atached as a js object
        console.log(results)
        res.status(201).json({
        status: "succes",
        data: {
            restaurant: results.rows[0],  //this will only work because of returning * at the end of query coz otherwize rows would be obviously empty (sql doesnt return anything in a insert into statment, unless "returning *, id etc.. )
        }
    })
    } catch (err){
        console.log(err)
    }
})

//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id=$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id] )
        console.log(req.params.id)
        console.log(req.body)
        console.log(results)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
    })
    }catch (err){
        console.log
    }
} )

//delete restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id])
        res.status(204).json({
            status: "success"
    })
    }catch (err){
        console.log(err)
    }
})



app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {   //we  gonna have access ot req,res

    try{
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        console.log(newReview)
        res.status(201).json({
            status: "sucess",
            data: {
                review: newReview.rows[0]
            }
            //so now we can test it in postman :))))
        })
    } catch (err) {
        console.log(err)
    }
})         

const port = process.env.PORT || 3001;  //"so we are sorting a variable of port to the value of port in the .env file",   "||" means: however if its not defined we are listening on port 3001
// and now we can tell our express app to listen on a specific port
app.listen(port, () => {       //usualy 3000   // and the second thing is a call-back function, so exencialy once our express server starts up what you want to do?
    console.log(`Server is up and listening on port ${port}`)
})   

// i wanna actually use the env var in our app... its not neces. good to just hardcode port'3005' becouse in dev ok but maybe in prod its not going to be 3005
// there is a package really helpful for managing env variables & its called "dotenv" you can find it on npmjs.com,

// we could make another route eg. 
// app.get("/api/v1/restaurants/:id/reviews", () => {} however this would means comunicating with db twice, we can do it within the "get restaurant api call" we gona retrive the data for the reviews within this route handler and the return it to our front end, so front has to make only one call to back


// gdy w zapytaniu byl blad (logiczny) nie istnialo takie where=id , to strona jakby sie ladowala, ale komponenty sie nie ladowaly, consol.log tez jak to ugryzc??? 