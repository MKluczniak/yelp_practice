import React, {useState} from "react";    //dlaczego tu jest {} wokol useState ?
import {useParams} from "react-router-dom"

const UpdateRestaurant = (props) => {     //o co chodzi z tym props ??

//firts thing we need to thing about is what restaurant we are trying to update and we can easly grab the information from the url, react router has a hook for that.. useParams() hook (below)
    const {id} = useParams()           //"now we have access to our id"                             //const test = useParams() console.log(test)    //react router is goint to pass all the parameters we have in our url
    const[name, setName] = useState()
    const[location, setLocation] = useState("")
    const[priceRange, setPriceRange] = useState("")

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
        <button className="btn btn-primary"> Submit</button>
    </form>

    </div>)
}

export default UpdateRestaurant    // ??

// IMP the next thing we have to do any time we work with forms within react is make this a "controled form" "make all these input controled" we gonna have to define state for each of the inputs  const[name, setName] = useState()"dont forget to import that" const[location, setName] = useState() etc... and we need to add a value={name} etc. to our "html inputs" AND onChange={e => setName(e.target.value)} etc.
// IMP so at the begining we just pased the parameter (id) with use of:  const test = useParams()  console.log(test)  and it loged our id in console of restaurants/"id"/update, but now we are going to "distructure that out"  ("and also make sure you pass props") and we gonne distructure

//ERROR SPOTTER
// const[name, setName] = useState("")  Lack of ' "" ' within the useState("") was causing a Warning:
// ?? react_devtools_backend.js:4026 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.