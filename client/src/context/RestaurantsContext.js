import React, {useState, createContext}
 from "react";  


export const RestaurantsContext = createContext() // this is going to create our context 

//and now we have to create our context provider component so we are goijng to wrap up all our application so they all hava access 

export const RestaurantContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    const addRestaurants = (restaurant) => { // we gonna pass our newly created resaturant 
        setRestaurants([...restaurants, restaurant]) //what we gonna do we gonna take all the currnet entries in restaurants array and copy it to the new array
    }  
 
    return(

        <RestaurantsContext.Provider value={{restaurants: restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>      //we have to remeber to pass addrestaurants do our component so it can use the it and lets go to addrestaurant component
            {props.children}
        </RestaurantsContext.Provider>

    )
}



//what we wanna do is when the user select the restaurant we wana ceate a new state in our context called selectedrestaurant so that the restautrant application knows what the user has selected, (we have to pass it to  <RestaurantsContext.Provider value={{restaurants: restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>)