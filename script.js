let btn = document.querySelector('#btn')
let content = document.querySelector('#content')
let voice = document.querySelector('#voice')

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate= 1
    text_speak.pitch= 1
    text_speak.volume= 1
    text_speak.lang="en-GB"
    window.speechSynthesis.speak(text_speak)
}


function wishme(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12 ){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon Sir")
    }
    else{
        speak("Good evening Sir")
    }

}

window.addEventListener('load',()=>{
    wishme()

    })

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
   let transcript =  event.results[currentIndex][0].transcript
   content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"

})
function takeCommand(message){
    btn.style.display = "flex"
     voice.style.display = "none"

    if(message.includes("hello"||"hey")){
        speak("hello sir, what i can help you?")
    }
    else if(message.includes("who are you")){
        speak("I am Virtual Assistant Eva, created by Falak Zehra")

    }
    else if(message.includes("open youtube")){
        speak("Opening YouTube")
        window.open("https://www.youtube.com/")

    }
    else if(message.includes("open instagram")){
        speak("Opening instagram")
        window.open("https://www.instagram.com/")

    }
    else if(message.includes("open facebook")){
        speak("Opening instagram")
        window.open("https://www.facebook.com/")

    }
    else if(message.includes("open google")){
        speak("Opening google")
        window.open("https://www.google.co.in/")

    }
    else if(message.includes("open calculator")){
        speak("Opening calculator")
        window.open("calculator://")

    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric", minute :"numeric"})
        speak(time)

    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric", month :"short"})
        speak(date)

    }


    else{
       
        speak(`this  is what I found on Internet regarding ${message}`)

        window.open(`https://www.google.co.in/search?q=${message}`)    
        
    }
    
   
}






