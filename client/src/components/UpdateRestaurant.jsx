import React, {useEffect, useState} from "react";    //dlaczego tu jest {} wokol useState ?
import { useContext } from "react";
import {useNavigate, useParams} from "react-router-dom"
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";


const UpdateRestaurant = (props) => {     //o co chodzi z tym props ??

//firts thing we need to thing about is what restaurant we are trying to update and we can easly grab the information from the url, react router has a hook for that.. useParams() hook (below)
    const {id} = useParams()           //"now we have access to our id"                             //const test = useParams() console.log(test)    //react router is goint to pass all the parameters we have in our url
    let history = useNavigate()
    const { restaurants } = useContext(RestaurantsContext)
    const[name, setName] = useState("")
    const[location, setLocation] = useState("")
    const[priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async ()=> {
        
        const response = await RestaurantFinder.get(`/${id}`) //and the url we gonna get is /id (zrozum lepiej jak to sie laczy z RestaurantFinder our API)
        console.log(response.data.data)
            // now as we have that date we can set the values just retrived to the input fields
        setName(response.data.data.restaurant.name)
        setLocation(response.data.data.restaurant.location)
        setPriceRange(response.data.data.restaurant.price_range)
        }  
        fetchData() //dont forget to call the f :p
    }, []) //and dont forget to pass an empty dependency array  ?? "so we only run this when the component mounts"

    const handleSubmit = async (e) => {   //make sure we pass the "e" (event object) in to that f, "so now we have to make a api call so make sure it is a async f" ??
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {  //here wa call our api object... but we need to also pass the data back to api!!
            name,   // here w pass the name which is going to reference *name* "const[*name*, setName] = useState("")"" so whatever value what is stored in our text input
            location,
            price_range: priceRange
        }) 
        history("/")
        console.log(updatedRestaurant)
    }
    

 return (<div>
    <form action=""> 
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"/>
        </div>
        <div className="form-group">
            <label htmlFor="Location">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} id="Location" className="form-control" type="text"/>
        </div>
        <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary"> Submit</button>  
    </form>

    </div>)
}

export default UpdateRestaurant    // ??

// IMP the next thing we have to do any time we work with forms within react is make this a "controled form" "make all these input controled" we gonna have to define state for each of the inputs  const[name, setName] = useState()"dont forget to import that" const[location, setName] = useState() etc... and we need to add a value={name} etc. to our "html inputs" AND onChange={e => setName(e.target.value)} etc.
// IMP so at the begining we just pased the parameter (id) with use of:  const test = useParams()  console.log(test)  and it loged our id in console of restaurants/"id"/update, but now we are going to "distructure that out"  ("and also make sure you pass props") and we gonne distructure


// looks like :p we already have all the date in the useContext(RestaurantsContext)

//ERROR SPOTTER
// const[name, setName] = useState("")  Lack of ' "" ' within the useState("") was causing a Warning:
// ?? react_devtools_backend.js:4026 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.


//  to let the user UX see the "values like name of the restaurant he clicked "Update" but already in the /update route we need to retrive that data stored in our context, in our case in the RestaurantsContext.jsx and we can use the usecontext to retrive that data however its going to create one problem... we can use the useContext hook "const {restaurants} = useContext(RestaurantContext) and the <h1>{restaurants[0].name}</h1> and it will show it on the updata page, co it is techincly working, HOWEVER:
// cdna. but lets say user bookmarks the page restaurants/id/update or we navigate directly to there in the new card... we got an error "Cannot read proppery 'name' of undifined" thats because the home page with this restaurants list its what its what is responsible for fatching the data from the api! and if we go DIRECTLY to the restaurant/id/update we never have that restaurantList component fetch the data from our api and so there is no restaurants.. :P you can not access the data {restaurants[0].name} because it is undifined at the moment that why we are not gonna use the context component cdn.
//cdna. isted what i wont this component UpdateRestaurant.jsx to do is fetch the data for that specific restaurant so even user go directly he can see it, so its automaticly fetching data and we do not rely on having to go to home page first cdn.
// cdna. so once again we gonna use the useEffect hook to retrive that data
// 
//useEffect(() => {
//    const fetchData = async ()=> { 
// 
//const response = await RestaurantFinder.get(`/${id}`) //and the url we gonna get is /id (zrozum lepiej jak to sie laczy z RestaurantFinder our API)
//console.log(response.data.data)
//setName(response.data.data.restaurant.name)
//setLocation(response.data.data.restaurant.location)
//setPriceRange(response.data.data.restaurant.price_range)
//}  
//fetchData() //dont forget to call the f :p
//}, []) 

//when we submit something in react we want to add (to the f run on onClick(f)) e.preventDefault