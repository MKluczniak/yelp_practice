import React from "react";

const StarRating = ({rating}) => {
    const stars = [];// here gona be stored 3 different stars    (from fot awsome)
    for (let i = 1; i <= 5; i++){

        if (i <= rating){
            stars.push(<i class="fa-solid fa-star"></i>)
        }
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i class="fa-solid fa-star-half-stroke"></i>)

        }

        else {
            stars.push(<i class="fa-regular fa-star"></i>)
        }

    }
    
    return (
        <>
        {stars} 
        </>
    )
}

export default StarRating


//<i class="fa-solid fa-star-half-stroke"></i> half star