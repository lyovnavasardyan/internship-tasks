document.addEventListener('DOMContentLoaded',()=>{
    const number = document.getElementsByClassName("value")[0];
    
    const increment = document.getElementById("1");
    increment.addEventListener('click',()=>{
         number.innerHTML ++
    });

    const decrement = document.getElementById("2");
    decrement.addEventListener('click',()=>{
         number.innerHTML--
    });

    const reset = document.getElementById("3");
    reset.addEventListener('click',()=>{
         number.innerHTML = 0;
    });

})