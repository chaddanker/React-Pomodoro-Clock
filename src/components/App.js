import React from 'react';

import Timer from './Timer'; 

const App = () => {
    return (
        <div >
            <div className="text-center">
                <Timer />
                <p style={{ fontFamily: "'Bebas Neue', cursive", color: "gray" }}>Designed and Coded By <i style={{color: "#000"}}>Chad Danker</i></p>
            </div>
        </div>
    );
};

export default App;
