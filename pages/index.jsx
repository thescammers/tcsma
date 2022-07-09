
import React, {useState, useEffect} from 'react';
import Contents from '../components/Contents'
import styles from '../styles/Home.module.css'


let audio
if (typeof window !== 'undefined') {
  audio = new Audio('/aud/The_scam_no1.wav')
  audio.loop=true;
}


export default function Home() {
   
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [musicplay, setMusicplay] = useState(false);

  const [clickAudio, setClickAudio] = useState();

  useEffect(() => { setClickAudio(new Audio('/aud/Click_Sound.wav')) }, [])
  useEffect(() => {
    const id = setInterval(() => setCount((oldCount) => oldCount + 1), 500);
    return () => {
      clearInterval(id);
    };
  }, [count]);
  useEffect(() => {
    
    musicplay ? audio?.play() : audio?.pause();
  },
    [musicplay]
  );
  
  const clickSound = () => {
    clickAudio?.play()
  }
  


    
  return (
     <div id="wrap" className="fixed w-screen h-screen overflow-auto md:flex">
       
      <div className="w-full h-full flex flex-col border-x-4 border-t-8 border-black">


        <div className="flex flex-col">
          <div className={`${start ? 'h-10 md:h-16' : 'h-24 md:h-40'} cursor-pointer transition-all duration-1000 bg-black text-white flex items-center justify-center`}>
              <h1 onClick={()=>{if(start){setMusicplay(false)} setStart(false)}} className={`group transition-all duration-1000 ${count < 2 && '-translate-x-10 md:-translate-x-20'} hover:-translate-x-10 md:hover:-translate-x-20 flex`}>
                <h1 className={`${count < 2 && 'opacity-0'} cursor-pointer text-4xl md:text-6xl font-light text-white group-hover:opacity-0 transition-all duration-1000`}>The s</h1> 
                <h1 className="text-4xl md:text-6xl font-light text-white">cAm.</h1>
              </h1>
          </div>
          <div className="h-10 md:h-14 bg-contain bg-repeat-x bg-[url('/updown/Up.PNG')]"></div>
        </div>

        
    {start? (<Contents setMusicplay={setMusicplay} musicplay={musicplay}/>) : (<div className="w-full flex-1 flex flex-col justify-center items-center">
          <div onClick={()=>{setStart(true); setMusicplay(true); clickSound(); }}className={`before:content-['mint'] hover:before:content-['AgAin?'] bg-black text-white md:text-xl px-3 py-2 md:px-5 md:py-3 border-2 border-black font-bold cursor-pointer hover:border-white hover:bg-white hover:text-black`}>
  
          </div>
        </div>)}


        

        <div className="flex flex-col">
          <div className="h-10 md:h-14 bg-contain bg-repeat-x bg-[url('/updown/Down.PNG')]"></div>
          
          <div className={`${start ? 'h-10 md:h-16' : 'h-24 md:h-40'} transition-all duration-1000 bg-black text-white flex justify-center items-center space-x-5 md:space-x-16`}>
            
            <div className="w-8 h-8 hover:rotate-12 duration-500 cursor-pointer md:w-14 md:h-14">
              <img  alt="eth" className="object-fill" src='/3logo/ethscan.png' />
            </div>
            <div className="w-7 h-7 hover:rotate-12 duration-500 cursor-pointer md:w-12 md:h-12">
              <img onClick={() => window.open('https://twitter.com/thescamxyz', '_blank')} alt="twit" className="object-fill" src='/3logo/twit.png' />
            </div>
            <div className="w-8 h-8 hover:rotate-12 duration-500 cursor-pointer md:w-14 md:h-14">
              <img alt="opensea" className="object-fill" src='/3logo/opensea.png' />
            </div>
          </div>

          
        </div>



        

      </div>
    </div>
  )
}