import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReview = () => {
    const { id } = useParams()        //this is going ot give as access to the specific id we want (we need to distrucure out :P)
    const location = useLocation()
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
    
    console.log(selectedRestaurant)


    

    let navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [rating, setRating]= useState("")
    const [reviewText, setReviewText ] = useState("")


    const handleSubmitReview = async (e) => {
         e.preventDefault()
         try{
            const response = await RestaurantFinder.post(`/${id}/addReview`, 
            {
                name, 
                review: reviewText,
                rating,
            })
            navigate(`/`)
            navigate(location.pathname)
         }catch (err) {
            console.log(err)
         }
    }

    return (
        <div className="mb-2">
            <form>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name" > Your Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                            <option value=""  disabled >Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value) } placeholder={`Tell us about your experience in ${selectedRestaurant.restaurant.name}`} id="Review" className="form-control"></textarea>
                </div>
                {/* //in here,  "in our API component" when the user clicks submint we need to add a review so "hit that API endpoint" so we set the onClick event handler */}
                <button type="submit" onClick={handleSubmitReview} placeholder="Tell us about your experience in" className="btn btn-primary">
                    Submit 
                </button>
            </form>
        </div>
    )
}



export default AddReview
    
//in here,  "in our API component" when the user clicks submint we need to add a review so "hit that API endpoint"