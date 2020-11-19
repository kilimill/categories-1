const iphone = document.querySelector('#group-iPhone'),
      ipad = document.querySelector('#group-iPad'),
      mac = document.querySelector('#group-MacBook'),
      btn1 = document.querySelector('#btn1'),
      btn2 = document.querySelector('#btn2'),
      btn3 = document.querySelector('#btn3'),
      imdpc = document.querySelector('.imdpc'),
      popupBtn = document.querySelector('.consult-btn'),
      popup = document.querySelector('#fast-lead'),
      close = document.querySelectorAll('.close-button');


function addClassIpad(){
  event.preventDefault();
  ipad.classList.add('active');
  // iphone.classList.remove('active');
  // mac.classList.remove('active');
  // imdpc.id = 'active-iPad';
}

function addClassIphone() {
  event.preventDefault();
  iphone.classList.add('active');
  // ipad.classList.remove('active');
  // mac.classList.remove('active');
  // imdpc.id = 'active-iPhone';
}

function addClassMac() {
  event.preventDefault();
  mac.classList.add('active');
  // ipad.classList.remove('active');
  // iphone.classList.remove('active');
  // imdpc.id = 'active-MacBook';
}

btn2.addEventListener('click', addClassIpad);
btn1.addEventListener('click', addClassIphone);
btn3.addEventListener('click', addClassMac);

// function popapMaster() {
//   popup.classList.add('active');
// }

function popapClose() {
  ipad.classList.remove('active');
  iphone.classList.remove('active');
  mac.classList.remove('active');
}

close[0].addEventListener('click', popapClose);
close[1].addEventListener('click', popapClose);
close[2].addEventListener('click', popapClose);
// popupBtn.addEventListener('click', popapMaster);
// close