import React, { useEffect, useState } from 'react'
import axios from 'axios'
import cloudImg from './images/cloud.png'
import humidity from './images/humidity.png'
import wind from './images/wind.webp'
import mist from './images/mist.jpg'
import rain from './images/rain.png'
import drizzle from './images/drizzle.webp'
import clear from './images/clear.webp'




export default function Home() {

  const [name,setname]=useState('')
  const [error,seterror]=useState('')
  const [data,setdata]=useState({
    celcius:10,
    name:'London',
    humidity:10,
    speed:2,
    image:`${cloudImg}`
  })

  

  const handleclick=()=>{
    if (name!==""){
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d1484b0dcb8e1d4808c7682aebd19107&units=metric`
      axios.get(apiUrl).then(res=>{
        let imagePath=''
        console.log(res.data);
       if(res.data.weather[0].main=="Clouds"){
        imagePath=`${cloudImg}`
       }else if(res.data.weather[0].main=="Clear"){
        imagePath=`${clear}`
       }else if(res.data.weather[0].main=="Rain"){
        imagePath=`${rain}`
       }else if(res.data.weather[0].main=="Drizzle"){
        imagePath=`${drizzle}`
       }else if(res.data.weather[0].main=="Mist"){
        imagePath=`${mist}`
       }
       else{
        imagePath=`${cloudImg}`
       }
        setdata({...data,celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed,
        image:imagePath
        })
      }).catch(err=>{
        if(err.response.status==404){
          seterror("Invalid City Name")
        }else{
          seterror('')
        }
        console.log();
      })

    }
  }


  return (
    <div className='container'>
      <div className='weather'>
      <div className='search'>
        <input type='text' placeholder='Enter city Name' onChange={e=>setname(e.target.value)}/>
        <button onClick={handleclick}>Search</button>
            
      </div>
      <div className='error'>
        <p>{error}</p>
      </div>
         <div className='winfo'>
            <img src={data.image} />
            <h1>{Math.round(data.celcius)}°c</h1>
            <h2>{data.name}</h2>
            <div className='details'>
                <div className='col'>
                    <img src={humidity}/>
                    <div className='humidity'>
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind}/>
                    <div className='wind'>
                        <p>{Math.round(data.speed)}km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
               

            </div>
         </div>
      </div>
      
    </div>
  )
}
