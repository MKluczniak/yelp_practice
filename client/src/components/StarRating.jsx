import React from "react";

const StarRating = ({rating}) => {
    const stars = [];// here gona be stored 3 different stars    (from font awsome)
    for (let i = 1; i <= 5; i++){

        if (i <= rating){
            stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
        }
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>)
        }
        else {
            stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>)
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