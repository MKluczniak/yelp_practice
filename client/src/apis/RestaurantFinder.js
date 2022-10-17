import axios from "axios";

export default axios.create(    //creating axios instance
{
    baseURL: "http://localhost:3006/api/v1/restaurants"  //Url of our backend server //because all our routes start with api/v1/restaurants
}) 

// so now we have our api defiend lets go back to our restaurant list and tell the component to fetch the date for us