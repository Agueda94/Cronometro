const numberC = document.querySelector("#cronometro");
const playPausebutton = document.querySelector("#play-pause");
const seconds = document.querySelector("#seconds");
const stopbutton = document.querySelector("#stop");

playPausebutton.addEventListener("click", Playpause);
stopbutton.addEventListener("click",stop);

let secondsInterval; /*variable que utilizaremos para ir cambiando los numeros*/
let runningTime = 0; /*lleva la cuenta del tiempo que ha pasado*/

function Playpause (){

    const isPause = !playPausebutton.classList.contains("running");
    if(isPause){
        playPausebutton.classList.add("running");
        start();
    }else{
        playPausebutton.classList.remove("running");
        pause();

    }
}

/*esta funcion nos permite el stop*/
function stop() {
    seconds.style.transform = "rotate(-90deg) translateX(6.0rem)";
    seconds.style.animation = "none";
    playPausebutton.classList.remove("running");
    runningTime = 0;
    clearInterval(secondsInterval);
    numberC.textContent = "00:00";
}



/*esta nos permite pausar*/
const pause = () =>{
    seconds.style.animationPlayState = "paused";
    clearInterval(secondsInterval);
}



/*esta funcion permite que el circulo pequño comience a girar*/
const start = () =>{
    seconds.style.animation = "rotacion 60s linear infinite";
    seconds.style.animationPlayState = "running";/*quitamos el pause que le colocamos en el css*/
    let startTime = Date.now() - runningTime;/*estamos setiando un tiempo de inicio, date.now() nos permite obtener los milisegundo*/
    
    
    secondsInterval = setInterval(() =>{
        runningTime = Date.now() - startTime;/*si start es 10s y pasa un segundo entonces Date.now() es igual a 11s, 11s - 10s = 1s */
        numberC.textContent = calculateTime(runningTime);/*es para modificar los numeros en el cronometro*/
    },1000)
}    

/* total_seconds % 60 es para que el conteo solo llegue a 60*/
/*para volver un dato en string toString()*/
/*padStart es para que el conteo inicie con el numero de la izquierda y el de adelante permanezca en 0*/


const calculateTime = runningTime =>{
        const total_seconds = Math.floor(runningTime/1000);
        const total_minutes = Math.floor(total_seconds/60);

        const display_seconds = (total_seconds % 60).toString().padStart(2,"0");
        const display_minute = total_minutes.toString().padStart(2, "0");

        return `${display_minute}: ${display_seconds}`
}