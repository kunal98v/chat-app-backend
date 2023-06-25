
const socket = io('https://chat-app-backend-p71m.onrender.com')

let btn = document.querySelector(".btn");
let inputBox = document.querySelector(".inputBox");
let chatBox = document.querySelector(".chatBox");
let getName = document.querySelector("#name");

var audio = new Audio('ting.mp3')

let namee;
do{
    namee = prompt("enter your name");

}while(!namee)

getName.innerText = `Welcome ${namee}`;
socket.emit('new-user-joined',namee);


function append(name,msg,position,color){

    
    let div = document.createElement('div');

    if(position == "Right"){
        audio.play()
        div.style.backgroundColor = "#00FF00";
    }

    div.classList.add('chat')
    div.classList.add(position)
    console.log(name,msg)
    div.innerHTML = `<b>${name}</b> : ${msg}`;

    var time = new Date();
    var getTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let span = document.createElement('span')
    span.classList.add('time')
    span.innerText = getTime;
    div.appendChild(span);
    
    if(msg){
        chatBox.appendChild(div);
    }
    inputBox.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}


socket.on('user-joined',(name) =>{
    console.log(name+'joined');
    let div = document.createElement('div')
    div.innerText = `${name} joined`
    div.classList.add('center')
    chatBox.appendChild(div)
    chatBox.scrollTop = chatBox.scrollHeight;


});


socket.on('receive',data=>{
    append(data.name,data.message,"Right",data.color);
    

});

socket.on('left',name=>{
    let div = document.createElement('div')
    div.innerText = `${name} left`
    div.classList.add('center')
    chatBox.appendChild(div)
    chatBox.scrollTop = chatBox.scrollHeight;
})

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    socket.emit('send',inputBox.value)
    append("You",inputBox.value,"Left","aqua")  
});
inputBox.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        socket.emit('send',inputBox.value)
        append("You",inputBox.value,"Left","aqua")  
    }
    
});
