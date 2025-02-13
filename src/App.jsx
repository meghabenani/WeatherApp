import {useState,useEffect} from "react";
import { FaLocationDot } from "react-icons/fa6";
import { ApiKey } from "./components/ApiKey";


let App=()=>{
  let [val,setVal]=useState("delhi")
  let MonthArr=["January","February","March","April","May","June","July","August","September","November","December"]
  let dayArr={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"}
  let date=new Date()

  let [name,setName]=useState("")
  let [data,setData]=useState("")
  let [icon,setIcon]=useState("")
  let [wind,setWind]=useState("")
  let [theme,setTheme]=useState("https://cdn-icons-png.flaticon.com/128/15628/15628246.png")
  let [isDay,setisDay]=useState(true)
    
    let fetchApi=async ()=>{
        let api=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${ApiKey}`)
        let res=await api.json()
        setName(res.name)
        setData(res.main);
        setIcon(res.weather[0]) 
        setWind(res.wind)
    }
    
    useEffect(()=>{
        fetchApi()
    },[])
   

  
  return(
    <div className="container m-6">
      <h1 className="text-center text-3xl font-bold">Weather App</h1>
      <div className="input flex container my-5 md:w-1/2 m-auto p-auto">
        <input value={val} onChange={(e)=>{
          setVal(e.target.value)
        }} type="text" className="bg-white rounded-xl w-full m-3 py-1 px-4"/>
        <button className="bg-red-600 rounded-full px-6 my-3 py-2 text-white" onClick={()=>{
          fetchApi()
        }}><FaLocationDot /></button>
      </div>
      <div className="text-center text-lg">
        {dayArr[(date.getDay())]}, {date.getDate()}-{MonthArr[date.getMonth()]}-{date.getFullYear()}
      </div>
      <div className="bg-white container lg:w-1/2 my-5 p-4 rounded-xl m-auto p-auto">
                <h1 className="m-6">Current Weather</h1>
                <div className="flex justify-between m-6">
                <div className="temp">
                <h1 className="font-bold text-2xl">{name.toUpperCase()}</h1>
                <div className="flex img">
                <img src={`https://openweathermap.org/img/wn/${icon.icon}@2x.png`} alt="" />
                <p className="text-3xl py-6">{Math.floor(data.temp-273.15)} °C </p>
                </div>
                <p className="text-xl">{icon.main}</p>
                </div>
                <div className="other ">
                    <div className="humi flex m-5">
                        <img className="w-5  mx-3" src="https://cdn-icons-png.flaticon.com/128/5587/5587247.png" alt="" />
                        Humidity {data.humidity}%
                    </div>
                    <div className="w flex m-5">
                        <img className="w-5  mx-3" src="https://cdn-icons-png.flaticon.com/128/2011/2011448.png" alt="" />
                        <p>Wind {Math.floor((wind.speed*3600)/1000)} Kph</p>
                    </div>
                    <div className="p flex m-5">
                        <img className="w-5 mx-3" src="https://cdn-icons-png.flaticon.com/128/10040/10040086.png" alt="" />
                        <p>Pressure {data.pressure} hpa</p>
                    </div>
                </div>
                </div>
                
                <div className="logo flex p-3 fixed right-20 md:right-0 mx-6">
                  <img className="w-10 mx-6" src={theme} alt="" onClick={()=>{
                    setisDay(!isDay)
                    isDay?setTheme("https://cdn-icons-png.flaticon.com/128/15628/15628246.png"):setTheme("https://cdn-icons-png.flaticon.com/128/4623/4623236.png")
                    isDay?document.querySelector("body").style.backgroundColor="lightBlue":document.querySelector("body").style.backgroundColor=" rgb(39, 25, 100)"
                  }} />
                  <img className="w-10" onClick={()=>{
                      window.open("https://github.com/meghabenani/Frontend_Projects/tree/master/React%20Projects/15_WeatherApp","_blank")
                  }} src="https://cdn-icons-png.flaticon.com/128/2111/2111432.png" alt="" />
                </div>
            </div>

           
    </div>
  )
}

export default App