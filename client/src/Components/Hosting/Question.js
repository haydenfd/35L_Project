// let btn = document.getElementsByClassName('btn');
// let container = document.getElementsByClassName('container');

// const action = function(e) {
//   // set up new button
//   let newBtn = document.createElement('button');
//   newBtn.innerHTML = 'click here for assistance';

//   // for new button decoration
//   let color1 = Math.min(Math.floor((Math.random() * 1000)/3), 255);
//   let color2 = Math.min(Math.floor((Math.random() * 1000)/3), 255);
//   let color3 = Math.min(Math.floor((Math.random() * 1000)/3), 255);
  
//   // if the button hasn't been clicked
//   if (e.target.children[0].innerHTML < 1) {
//     container[0].appendChild(newBtn);
    
//     // target the last created child - button
//     let currentElem = container[0].children;
//     currentElem[currentElem.length - 1].setAttribute('class', 'btn');
//     currentElem[currentElem.length - 1].style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
//     currentElem[currentElem.length - 1].addEventListener('click', action);
//   }
  
//   // get the current element's count
//   let numb = Number(e.target.children[0].innerHTML);
//   e.target.children[0].innerHTML = numb + 1;
// }

// for (let i = 0; i < btn.length; i++) {
//   btn[i].addEventListener('click', action);
// }