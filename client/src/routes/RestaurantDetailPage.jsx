import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
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
                setSelectedRestaurant(response.data.data)  //basicly the purpose was to retrive that data  and store it within this state var "setSelectedRestaurant" and once we do that we can render it out
        }
        catch (err){console.log(err)}
    }
        fetchData()
    }, [])
    return (
        <div>

            {selectedRestaurant && (  //multiline jsx expresion "(  )" and couple of  fragments <></>
                <>
                <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>     {/*//our restaurant is stored in the selectedRestaurant, if you are confused about that just go restaurant and check the way we store our data. components--RestaurantContextProvider--"our stat is going to look like.. check in hooks--state" */}
                <div className="mt-3 ">
                    <Reviews reviews={selectedRestaurant.reviews}/>  {/*so now reviews has access to restaurant and all the reviews, and now we can go to the Reviews component and update acordingly */}
                </div>
                <AddReview/>
                </>
            ) }
        </div>
    )
}

export default RestaurantDetailPage