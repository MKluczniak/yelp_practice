// app.use(morgan("tiny"))     //USING MORGAN   |  no need to use next()(already configured to do it)
// //creating middleware
// app.use((req,res, next) => {     //thats all it is, middleware is that simple all we need to do is say next() in or function so it will go one step furter to next middleware or to a final middleware-route
//     console.log("yeah im a middleware")
//     next(); //tells the middle were go to the next middlware  
// });  //were you define a middleware is very important the program will go to the first middleware which maches that url(in our case it macha all urls any req can hit it) if we put it below our route it will never run

// app.use((req, res, next) => {    //so from the middleware we can send a res to the user! ;) that how powerful midlleware is
//     res.status(404).json({
//         status: "fail"
//     });
// });

// app.use((req,res, next) => {});  //that way (coz we dont call next(), we can DROP the request) anything u can do in route u can do also in middleware
// //usualu you dont need to create your middleware there is ton of them in the internet you can do it with third party middleware"morgan"



// const pool = new Pool({     //we are going to create a new pool so this is actually what is going to conect to our postgres
//     user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// }) 

// // we can hard code our postgres credantials passing it as an object but it is recommende to do it through env vars