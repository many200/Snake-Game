const playBoard = document.querySelector(".play-board")
const score = document.querySelector(".score")
const heighScore = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")
const Level = document.querySelector(".level span")
const container = document.querySelector(".container")
const button = document.querySelector(".intro  button ")
const intro = document.querySelector(".intro")

//-----------------------------------------------------
let Key = true;
let level = 0
let foodx, foody;
let snakex = 5, snakey = 5;
let velocityx = 0, velocityy = 0;
let snakeBody = [];
let gameOver = false;
let setIntervaiId;
let Score = 0;
let HeighScoreFinal = localStorage.getItem("high-score") || 0 ;
heighScore.innerText = `High Score: ${HeighScoreFinal} $`;
//-----------------------------------------------------
button.addEventListener("click", (e) =>{
     Key = false
      if(Key === false){
         container.style.display = "block "
         intro.style.display = "none"
     }
})
//-----------------------------------------------------
 const changeDirection = (e) =>{
 
  if (e.key === "ArrowUp" && velocityy != 1) {
    velocityx = 0
    velocityy = -1
  }else if(e.key ==="ArrowDown" && velocityy != -1){
    velocityx = 0
    velocityy = 1
  }else if(e.key ==="ArrowRight" && velocityx != 1){
    velocityx = 1
    velocityy = 0
  }else if(e.key ==="ArrowLeft" && velocityx != -1){
    velocityx = -1
    velocityy = 0
  }
 
 }
 controls.forEach(key => {key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));

});
//-----------------------------------------------------
const changeFoodPosition = () => { 
 foodx = Math.floor(Math.random() * 30 ) + 1
 foody = Math.floor(Math.random() * 30 ) + 1
    
}
//-----------------------------------------------------

const handleGameOver = () =>{
    clearInterval(setIntervaiId)
    alert("Game Over ! Press ok to replay...")
    location.reload()
}
//-----------------------------------------------------
const initGame = (e) => {
    if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area:${foody} / ${foodx}">❌</div>`
    
    if (snakex === foodx && snakey  === foody ) {
        changeFoodPosition()
        snakeBody.push([foodx, foody])
        Score++
        HeighScoreFinal = Score >= HeighScoreFinal ? Score : HeighScoreFinal;
        localStorage.setItem("high-score", HeighScoreFinal )
        score.innerText = `Score : ${Score} $`
       heighScore.innerText = `High Score : ${HeighScoreFinal} $`
    }
    
   if (Score === 5) {
   Level.innerHTML = `Level : ${level +1}`
   Level.style.color = "#ffc107"
   Level.style.fontSize = "1.2rem"
    
   }else if(Score === 30){
    Level.innerHTML = `Level : ${level +2}`
   Level.style.color = "#ff7f07"
   Level.style.fontSize = "1.2rem"

   }else if (Score === 200) {
    Level.innerHTML = `Level : ${level +3}`
   Level.style.color = "#red"
   Level.style.fontSize = "1.2rem"
   clearInterval(setIntervaiId)
    alert("The game is over!!, Thanks you 😎")
    location.reload()
   }
   for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]  
   }

   snakeBody[0] = [snakex, snakey] 
     if (snakex <= 0 || snakey > 30 || snakey <= 0 || snakex > 30 ) {
        
        gameOver = true 
        
    }
    
      snakex += velocityx 
      snakey += velocityy

     for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> ` 
        
     
             
     if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true
     }
    }
     
    playBoard.innerHTML =  htmlMarkup
}
//-----------------------------------------------------
    
    changeFoodPosition()
    
    setIntervaiId = setInterval(initGame, 117)
    
    document.addEventListener("keydown", changeDirection)

