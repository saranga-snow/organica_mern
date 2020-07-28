import {API} from "../../backend";
//API means : localhost:8000/api


export const signup = user =>{
    console.log("auth/helper/index.js!!!");
    console.log(JSON.stringify(user));
    return fetch(`${API}/signup`,{
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};


export const signin = user =>{
    return fetch(`${API}/signin`,{
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};


export const authenticate = (data,next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}


export const signout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response => console.log("Signout Success"))
        .catch(err => console.log(err));
    }
};

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
}