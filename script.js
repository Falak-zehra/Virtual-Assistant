let btn = document.querySelector('#btn')
let content = document.querySelector('#content')

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate= 1
    text_speak.pitch= 1
    text_speak.volume= 1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}


function wishme(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12 ){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }
    else{
        speak("Good evening Sir")
    }

}
window.addEventListener('load',()=>{
wishme()
} )

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event)=>{
    console.log(event)
}

btn.addEventListener("click",()=>{
    recognition.start()
})