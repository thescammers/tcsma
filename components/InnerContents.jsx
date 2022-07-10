import React, { useState, useEffect } from 'react';
import { Context } from '../context/Context'

function InnerContents(props) {

  const { mint, getSupply, supply } = React.useContext(Context)
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((oldCount) => oldCount + 1), 500);
    //if (stop) { clearInterval(id); }
    return () => {
      clearInterval(id);
    };
  }, [count]);
  
    useEffect(() => {
      getSupply();
  }, [getSupply, supply]);


  return (
    <div className={`mt-5 flex flex-col justify-center items-center  transition-opacity duration-[2000ms] ease-in ${count > 1 ? 'opacity-100' : 'opacity-0'}`}>

      <h1 className="mt-3 text-lg md:text-2xl">
        click the mint button AgAin?
      </h1>

      <div className="flex items-center space-x-5 pt-5">
        <div onClick={() => { props.setRoadmap(true); setCount(0) }} className={`${count > 3 ? 'scale-100;' : 'scale-0'} transition-all duration-700 px-3 py-2 md:px-5 md:py-3 md:text-xl border-2 border-white duration-500 font-bold cursor-pointer hover:bg-black hover:border-black hover:text-white`}>roAdmAp</div>
        <div className={`${count > 3 ? 'scale-100;' : 'scale-0'} before:content-['mint'] hover:before:content-['soon'] bg-black text-white transition-all duration-700 px-3 py-2 md:px-5 md:py-3 md:text-xl border-2 border-black duration-500 font-bold cursor-pointer hover:bg-white hover:border-white hover:text-black`}></div>

      </div>
      <h1 className={`${count > 3 ? 'scale-100;' : 'scale-0'} transition-all duration-700 mt-5 text-lg md:text-2xl`}>0 / 9,999 <span className="text-base">minted</span></h1>
    </div>
  )
} export default InnerContents;