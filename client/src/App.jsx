import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './routes/Home'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import UpdatePage from './routes/UpdatePage'



const App = () => {       //so what we are doing is... this is our parent app component, so this is goint to wrap our entire application and we are going to render it to componetn called root' in the index.js file! (it shoud be printed on website after npm start)
    return (
    <div>
        {/* we need to wrap out applincation within router tags and then define routes, it going to tell react if it findes a route to stop looking for other routes   */}
        <Router>
            {/* it is best practice to wrap it with the Switch bc  */}
            <Routes >
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/restaurants/:id/update" element={<UpdatePage/>} />
                <Route exact path="/restaurants/:id" element={<RestaurantDetailPage/>} />
            </Routes>
        </Router>
    </div>
    );
};

export default App   // 'and we need to export our app'