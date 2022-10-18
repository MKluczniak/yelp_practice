import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";



const RestaurantDetailPage = () => {
    const {id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async() =>{
        try{   // calling api we always want to have it in the try catch block
                const response = await RestaurantFinder.get(`/${id}`)
                // console.log(response)
                setSelectedRestaurant(response.data.data.restaurant)  //basicly th e purpose was to retrive that data  and store it within this state var "setSelectedRestaurant" and once we do that we can render it out
        }
        catch (err){console.log(err)}
    }
        fetchData()
    }, [])
    return (
        <div>
            {selectedRestaurant && <StarRating rating={3.7}/>}
        </div>
    )
}

export default RestaurantDetailPage