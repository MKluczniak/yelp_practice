import React from "react";
import UpdateRestaurant from "../components/UpdateRestaurant";

const UpdatePage = () => {
    return (
        <div>
            <h1 className="text-center">Update Restaurant</h1>
            <UpdateRestaurant/>       {/*we need to load our component otherwise it wont load our lonsole.log within the component we just created*/}
        </div>
    )

}

export default UpdatePage