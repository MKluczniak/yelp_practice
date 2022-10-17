import React, { useState } from "react";
import { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)  //we wanna "distrucured out" addrestaurens, "use context make sure it is imported, and import restaurantContext"
    // we want the three inputs to be "controled inputs becuse by default js manages the statr of thr form however react wants to maintain all the state in our application" so we gonna make this controled inputs"
    //we gonna use couple of "use state hooks"
    const [name, setName] = useState("")   //its gonna manage the state of each input 
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range") //setting price range insted of "" sets the default value in the input select (insted of $)
    const handleSubmit = async (e) => {
        e.preventDefault();  //prevents realoading but also UI doesnt update obiously... so one way is to go to our RestaurantContext API and define a fundtion adding a restaurant
         try{
            const response = await RestaurantFinder.post("/", {
                name,   //we can shorten because the same on font and backend
                location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant)    //bacause we have already access to that f, and pass the res.data   thats where we store resataurant that we retrive back form our api 
            console.log(response)
            }catch(err)
            {}
    }
    return (
        //(we need to render that on the home page, home component)
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="Location"/>
                    </div>
                    <div className="col">
                        <select
                        value={priceRange} onChange={e => setPriceRange(e.target.value)}
                        className="custom-select my-1 mr-sm-2">    
                            <option disabled > Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant