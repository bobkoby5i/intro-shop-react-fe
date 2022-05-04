import React, {useState, useEffect} from 'react';

//console.log("API_KEY1:",REACT_APP_WEATHER_API_KEY)
const REACT_APP_BACKEND_URL      = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
const REACT_APP_FRONTEND_VER     = process.env.REACT_APP_FRONTEND_VER;
const REACT_APP_MERN_BACKEND_URL = process.env.REACT_APP_MERN_BACKEND_URL;

console.log("REACT_APP_MERN_BACKEND_URL:",REACT_APP_MERN_BACKEND_URL)




const AboutPage = () => {
    const [ip, setIp] = useState("");
    const [backEndVersion, setBackEndVersion] = useState({ver:"",msg:""});



    useEffect( ()=> {
        fetch(`${REACT_APP_MERN_BACKEND_URL}/version`, {  method: 'GET' })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.json();
            else
                throw new Error('Błąd sieci!');
        })
        .then(data => {
            // console.log(data);
            setBackEndVersion(data);
        })   
        .catch(error => {console.error('wystapil blad local', error)})     

        fetch('https://api64.ipify.org/')
        .then(response =>response.text())
        .then(ip => {
            // console.log(ip);
            setIp(ip)
        }).catch(error => {console.error('wystapil blad', error)})
    },[]);    


    // console.log(backEndVersion.ver)

    return(
        <div>
         <h1>About this app</h1>
         <p>This is a fullstack Spring Boot + React app. Online store: register; add remove products; purchase transaction.</p>
         <p className="bk-dark p">
            <strong>Technology : </strong> PostgreSQL, Heroku, Java Spring Boot API back-end, React with RxJS, JWT
         </p>
         <p className="bk-dark p">
             <strong>REACT_APP_BACKEND_URL API: </strong> {REACT_APP_BACKEND_URL} 
         </p>         
         <p className="bk-dark p">
             <strong>Front-end ver. : </strong> {REACT_APP_FRONTEND_VER}
         </p>
         <p className="bk-dark p">
             <strong>Back-end ver. : </strong> {backEndVersion.ver}
         </p>
         <p className="bk-dark p">
             <strong>Back-end info : </strong> {backEndVersion.msg}
         </p>
         {/* <p className="bk-dark p">
             <strong>REACT_APP_WEATHER_API_KEY</strong> {REACT_APP_WEATHER_API_KEY}
         </p> */}
         <p className="bk-dark p">
             <strong>IP : </strong> {ip}
         </p>
        </div>
    )
}


export  {AboutPage};