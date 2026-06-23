const input=document.querySelector("#guessInput");
const submit=document.querySelector("#submit");
const guessList=document.querySelector("#guessList");
const remainingAttempts=document.querySelector("#attempts");
const resultMessage=document.querySelector("#resultMessage");
const popup=document.querySelector("#popup");
const popupText=document.querySelector("#popupText");
const newGameButton=document.querySelector("#newgame");

newGameButton.addEventListener("click",function(){
    location.reload();
});

let attempts =10;
let gameEnd=false;
let popupActive= false;


let randomNumber=Math.floor(Math.random()*100)+1;

console.log(randomNumber);
submit.addEventListener("click",function(){
    let value=Number(input.value);
    console.log(value);
    input.value=""
    compareNumber(value);
    input.focus();
}
);

document.addEventListener("keypress",function(event){
    if(popupActive){
        if(event.key==="Enter" && gameEnd){
            newGameButton.click();
        }else{
            input.disabled=true;
            submit.disabled=true;
            setTimeout(() => {
                input.disabled=false;
                input.focus();
            }, 1000);
            setTimeout(() => {
                submit.disabled=false;
            }, 1500);
        }    
    }

    else if(event.key==="Enter"){
                submit.click();
            }
        
    }
);

window.addEventListener("load",function(event){
    input.focus();
});

function compareNumber(number){
    
    if(isNaN(number)||number<1||number>100){
        popupText.innerHTML=`Please enter a valid number <br> between 1 and 100!`;
        resultMessage.style.display="flex";
        popup.style.color="#f26565";
        popupActive=true;
        setTimeout(() => {
            resultMessage.style.display="none";
            popupActive=false;
        }, 1000);
    }
    
    else if(number==randomNumber){
        gameEnd=true;
        popupActive=true;
        popupText.innerHTML=`Congratulations!<br>You guessed the number CORRECTLY!<br>${randomNumber}`;
        resultMessage.style.display="flex";
        popup.style.color="#7dff88";
        newGameButton.style.backgroundColor="#7dff88";
        newGameButton.style.display="block";
        newGameButton.style.boxShadow = "0 0 15px #7dff88";

    }
    
    else if(number<randomNumber){
        previousGuesses(number);
        popupActive=true;
        if(decreaseAttempts())return;
        popupText.textContent="Too low! Try again!";
        resultMessage.style.display="flex";
        popup.style.color="#f26565";
    }
    
    else if(number>randomNumber){
        previousGuesses(number);
        popupActive=true;
        if(decreaseAttempts())return;
        popupText.textContent="Too high! Try again!";
        resultMessage.style.display="flex";
        popup.style.color="#f26565";
        
    }
        
};

function previousGuesses(number){
    let li= document.createElement("li");
    li.textContent=number;
    guessList.appendChild(li);
};

function decreaseAttempts(){
    attempts--;
    remainingAttempts.textContent = attempts;
    if(attempts<=0){
        gameOver();
        return true;
    }
    else{
        setTimeout(() => {
            resultMessage.style.display="none";
            popupActive=false;
        }, 1000);
    }
};

function gameOver(){
    gameEnd=true;
    popupText.innerHTML = `Game Over!<br>The number was ${randomNumber}`;
    popup.style.color="#ba65f2";
    newGameButton.style.display="block";
    newGameButton.style.backgroundColor="#ba65f2";
    newGameButton.style.boxShadow = "0 0 15px #ba65f2";
    resultMessage.style.display="flex";
};

