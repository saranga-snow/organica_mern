import React from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";


const Home = () => {
    return(
        <Base>
            {/* <h1 className="text-white" >HOME {API}</h1> */}
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    );
};


export default Home;