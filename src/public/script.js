

// cliente

const socket = io(); 


const list = document.getElementById('ul-view');


socket.on('message',(data)=>{
data.forEach(element => {
    list.innerHTML += 
    `<li>${element.tittle}</li>
    <li>$${element.price}</li>`;
});


console.log(data)
})



