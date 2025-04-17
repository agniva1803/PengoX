import React, { useState } from "react"; 
import "./Home.css";
import Header from "../../components/Header/Header";  
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";  
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import App from "../../App";
import AppDownload from "../../components/AppDownload/AppDownload";

function Home() {
    const [category, setCategory] = useState("All"); // ✅ State for category initialized to "All"

    return (
        <div>
            <h1>PengoX - Taste the Speed of Flavor!</h1>
            <Header />  
            <ExploreMenu category={category} setCategory={setCategory} /> {/* ✅ Pass state to ExploreMenu */}
            <FoodDisplay category={category} setCategory={setCategory} /> {/* ✅ Pass state to FoodDisplay */}
            <AppDownload />
        </div>
    );
}

export default Home;



