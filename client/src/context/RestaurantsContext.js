import React, {useState, createContext}
 from "react";  


export const RestaurantsContext = createContext() // this is going to create our context 

//and now we have to create our context provider component so we are goijng to wrap up all our application so they all hava access 

export const RestaurantContextProvider = props => {

    const [restaurants, setRestaurants] = useState([])

    const addRestaurants = (restaurant) => { // we gonna pass our newly created resaturant 
        setRestaurants([...restaurants, restaurant]) //what we gonna do we gonna take all the currnet entries in restaurants array and copy it to the new array
    }  
 
    return(

        <RestaurantsContext.Provider value={{restaurants: restaurants, setRestaurants, addRestaurants}}>      //we have to remeber to pass addrestaurants do our component so it can use the it and lets go to addrestaurant component
            {props.children}
        </RestaurantsContext.Provider>

    )
}
