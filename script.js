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
        speak("Good Morning ")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon ")
    }
    else{
        speak("Good evening ")
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
let wished = false;

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
    if(!wished){
    wishme()
    wished = true;
    }

})
function takeCommand(message){
    btn.style.display = "flex"
     voice.style.display = "none"

    if(message.includes("hello"||"hey")){
        speak("hello , how  can I help you?")
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
        
        let  date=new Date().toLocaleString(undefined,{day:"numeric", month :"short"})
         speak(date)
        


    }
   


    else{
       
        speak(`this  is what I found on Internet regarding ${message}`)

        window.open(`https://www.google.co.in/search?q=${message}`)    
        
    }



   
   
}
async function signup(e){
    e.preventDefault()
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const message = document.querySelector("#message")
    console.log(email.value, password.value)

    try{
    const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    

    console.log(result);
    message.textContent = `welcome ${email.value} `;
       message.style.color = "green"
       var timer = setTimeout(function() {
        window.location='signin.html'
    }, 2000);

    }

    catch(err){
        console.log(err)
        message.textContent = err.message;
       message.style.color = "red"
    }
    email.value = ""
    password.value = ""



}
async function signin(e){
    e.preventDefault()
    const email = document.querySelector("#loginemail")
    const password = document.querySelector("#loginpassword")
    const message = document.querySelector("#mess")
    console.log(email.value, password.value)

    try{
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)

    console.log(result);
    message.textContent = `welcome ${email.value} `;
       mess.style.color = "green"
       var timer = setTimeout(function() {
        window.location='index.html'
    }, 2000);
       

    }

    catch(err){
        console.log(err)
        message.textContent = err.message;
       mess.style.color = "red"

    }
    email.value = ""
    password.value = ""


}
//LOGOUT LOGIC BY FIREBASE AND JS

function signout(){
    const signoutsuccess = document.querySelector("#signoutsuccess")
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
        } else {
          console.log("signout success")
          signoutsuccess.textContent = "logout successful"
          signoutsuccess.style.color = "green"


        }
      });
}

  function handleUserInput() {
    const inputField = document.getElementById('userTextInput');
    const userInput = inputField.value.trim();
    
    if (userInput !== '') {
      addMessage('user', userInput);
      evaResponse(userInput);
      inputField.value = '';
    }
  }
  
  // Function to add message to chat window
  function addMessage(sender, text) {
    const chatWindow = document.getElementById('chatWindow');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  // Simulate Eva's reply
  function evaResponse(userText) {
    if(userText.includes("hello"||"hey")){
        response = "hello , how can I help you?"
    }
    else if(userText.includes("who are you")){
        response = "I am Virtual Assistant Eva, created by Falak Zehra"

    }
    else if(userText.includes("open youtube")){
        response = "Opening YouTube"
        window.open("https://www.youtube.com/")

    }
    else if(userText.includes("open instagram")){
        response = "Opening instagram..."
        window.open("https://www.instagram.com/")

    }
    else if(userText.includes("open facebook")){
        response = "Opening instagram"
        window.open("https://www.facebook.com/")

    }
    else if(userText.includes("open google")){
        response = "Opening google"
        window.open("https://www.google.co.in/")

    }
    else if(userText.includes("open calculator")){
        response = "Opening calculator"
        window.open("calculator://")

    }
    else if(userText.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric", minute :"numeric"})
        response = time
        


    }
    
    else if(userText.includes("date")){
        
        let  date=new Date().toLocaleString(undefined,{day:"numeric", month :"short"})
         response = date
        


    }
   


    else{
       
        response = `this  is what I found on Internet regarding ${message}`

        window.open(`https://www.google.co.in/search?q=${message}`)    
        
    }



   
   


    const responses = "Eva says: " + response; // simple repeat for now
    setTimeout(() => {
      addMessage('eva', responses);
    }, 500);
  }
  
