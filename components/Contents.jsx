import React, { useState, useEffect } from 'react';

import InnerContents from './InnerContents'
import Roadmap from './Roadmap'
import {Context} from '../context/Context'

function Contents(props) {

  const [count, setCount] = useState(0);
  const [count300, setCount300] = useState(0);
  const [blick, setBlick] = useState(true)
  const [blC, setBlC] = useState(true)
  const [stop, setStop] = useState(false);
  const [roadmap, setRoadmap] = useState(false);
  const [userName, setUserName] = useState();
  const {connectwallet, account} = React.useContext(Context)
  useEffect(() => {
    const id = setInterval(() => setCount((oldCount) => oldCount + 1), 500); //이거 숫자 낮추고 디테일하기 바꾸기 느낌표 워닝 먼저 나오게하기
    if (stop) { clearInterval(id); }
    return () => {
      clearInterval(id);
    };
  }, [stop]);

  useEffect(() => {
    const id = setInterval(() => setBlick((oldCount) => !oldCount), 500);
    const id2 = setInterval(() => setBlC((oldCount) => !oldCount), 1000);
    const id3 = setInterval(() => setCount300((oldCount) => oldCount + 1), 300);
    return () => {
      clearInterval(id);
      clearInterval(id2);
      clearInterval(id3);
    };
  }, []);
      useEffect(() => {
        if (account) {
              setUserName(
                `${account.slice(0, 7)}...${account.slice(38)}`,
              )
      }}, [account])

  
  return(
    <div className="w-full duration-1000 flex-1 flex flex-col justify-center items-center">


      
      
          <div id="ques" onClick={() => { props.setMusicplay(!props.musicplay); setStop(!stop) }} className={`h-28 w-28 mb-3 cursor-pointer transition-opacity duration-500 ease-in ${count300 > 2 ? 'opacity-100' : 'opacity-0'}`}>
            <img alt="logo" className="object-fill" src={stop? `/33logo/0.PNG` : `/33logo/${count % 33 + 1}.PNG`} />
          </div>


      
      
          <h1 className={`mb-12 md:mb-16 text-7xl md:text-8xl transition-opacity duration-1000 ease-in ${count300 > 2 ? 'opacity-100' : 'opacity-0'}`}>WARNING<span className={`transition-opacity duration-500  ${blick ? 'opacity-100' : 'opacity-0'}`}>.</span></h1>
        <div className={`transition-opacity duration-500 ease-in ${count > 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div onClick={()=>{connectwallet()}}className={`mt-0 border-2 bg-black md:text-lg text-white border-black px-8 md:px-14  cursor-pointer transition-opacity duration-1000  ${blC ? 'opacity-100' : 'opacity-0'} text-lg hover:opacity-100`}>
            {userName ? userName : 'connect WAllet'}
          </div>
        </div>

      {roadmap ? (<Roadmap setRoadmap = {setRoadmap}/>) : (<InnerContents setRoadmap = {setRoadmap} count = {count}/>)}
      
      
          





      

        </div>
  )
}export default Contents;