import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    // so now we have our api defiend lets go back to our restaurant list and tell the component to fetch the date for us
    let history = useNavigate();
    useEffect(() => {
        const fetchData = async () => {      // way around useEffect throwing warrning "must not return anything"
            try {       //api call to our backend
                const response = await RestaurantFinder.get("/")  //whatever url i have in restaurantsfinder and its "/" jaming it to the end 
                setRestaurants(response.data.data.restaurants)
                console.log(response)
            } catch (err) { }
        }
        fetchData();           //with use of it the useEffect doesnt return anythin (only the fetchdata) niezrozumiale??    
    }, [])  //empty dependecier array  means the useEffect function/hook  will only when the component mounts it (???)

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`)  //here we deleta and it works but to update UI we need to do..
            setRestaurants(restaurants.filter(restaurant => {    //whate the filter method does? when we return sth and   if the restaurant.id does not mach the id we are trying to delete we gonna add that to the array , and when they do match we make sure to leave it out 
                return restaurant.id !== id
            }))
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (id) => {
        // const navigate = useNavigate();
        history(`/restaurants/${id}/update`)  // so we ara adding the url into the history stack 
    }


    return (
        //(we need to render that on the home page, home component)
        <div className="list-group">

            <table className="table table-dark table-hover">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        {/* restaurants is the array which stores all the restaruants  */ } {/*there is potenialy that we will not be able to retrive data fast enough so.. if restautants exist we run the code with use of "&&: --> restaurants && restaurants.map  */ } {/*if restaurants exist means "if we successfuly fetch out data and stored it in our context" (otherwise restaurants will be undifined*/ }
                        return (
                            //*we always have to pass the key otherwise worning*
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <th scope="row">MCdonalds</th>
                        <td>Miami</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                    <th scope="row">Dobry przekaz leci</th>
                        <td>Zabrze</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                        
                    </tr>
                    <tr>
                    <th scope="row">U nos</th>
                        <td>Bytom</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                    <th scope="row">Noszo</th>
                        <td>Ruda Slaska</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                    <th scope="row">Pizzeria Caro</th>
                        <td>Pilchowice</td>
                        <td>$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList