import { useState, useEffect, useRef } from "react"

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const startTimeRef = useRef(0);
    const interval = useRef(null);

    useEffect(() => {
        if(isRunning){
            interval.current = setInterval(() => {
                setTimer(Date.now() - startTimeRef.current); 
        },10);
    }
        
        return () => {
            clearInterval(interval.current);
        }

    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - timer;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setIsRunning(false);
        setTimer(0);
    }

    function formatTime(){
        let hrs = Math.floor(timer / (1000 * 60 * 60));
        let mins = Math.floor(timer / (1000 * 60) % 60);
        let secs = Math.floor(timer / (1000) % 60);
        let ms = Math.floor((timer%1000)/10);

        hrs = String(hrs).padStart(2,"0"); 
        mins = String(mins).padStart(2,"0"); 
        secs = String(secs).padStart(2,"0"); 
        ms = String(ms).padStart(2,"0"); 

        return `${hrs}:${mins}:${secs}:${ms}`;
    }
    

    return(
        <div className="stop-watch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start" onClick={start}>Start</button>
                <button className="stop" onClick={stop}>Stop</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch