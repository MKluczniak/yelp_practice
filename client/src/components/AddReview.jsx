import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
    const { id } = useParams()        //this is going ot give as access to the specific id we want (we need to distrucure out :P)
    const location = useLocation()
    let navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [rating, setRating]= useState("")
    const [reviewText, setReviewText ] = useState("Rating")

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
                        <label htmlFor="name" > Name</label>
                        <input value={name} onChange={e => setName(e.target.value) } id="name" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value) } id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value) } id="Review" className="form-control"></textarea>
                </div>
                {/* //in here,  "in our API component" when the user clicks submint we need to add a review so "hit that API endpoint" so we set the onClick event handler */}
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}



export default AddReview
    
//in here,  "in our API component" when the user clicks submint we need to add a review so "hit that API endpoint"