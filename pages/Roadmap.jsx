import React, { useState, useEffect } from 'react';


function Roadmap(props) {

  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((oldCount) => oldCount + 1), 500);
    return () => {
      clearInterval(id);
    };
  }, []);

  
  return (
    <div className={`mt-5 flex flex-col justify-center items-center md:text-9xl transition-opacity duration-[2000ms] ease-in ${count > 1? 'opacity-100' : 'opacity-0'}`}>

      <h1 className="mt-3 text-lg md:text-2xl">
        roAdmap? whAt is thAt for? Still believe thAt?  
      </h1>

      <div className="flex items-center space-x-5 pt-5">
        <div onClick={()=>{props.setRoadmap(false)}} className={`${count > 2 ? 'scale-100;' : 'scale-0'} bg-white text-black border-white transition-all duration-700 px-3 py-2 md:px-5 md:py-3 md:text-xl border-2 border-black duration-500 font-bold cursor-pointer hover:border-black hover:bg-black hover:text-white`}>Yes</div>
        <div onClick={()=>{props.setRoadmap(false)}} className={`${count > 2 ? 'scale-100;' : 'scale-0'} bg-black text-white border-black transition-all duration-700 px-3 py-2 md:px-5 md:py-3 md:text-xl border-2 hover:border-white duration-500 font-bold cursor-pointer hover:bg-white hover:text-black`}>no</div>
      </div>
      <h1 className={`${count > 2 ? 'scale-100;' : 'scale-0'} transition-all duration-700 mt-5 text-lg md:text-2xl`}> NGMI
 </h1>
    </div>
  )
} export default Roadmap;