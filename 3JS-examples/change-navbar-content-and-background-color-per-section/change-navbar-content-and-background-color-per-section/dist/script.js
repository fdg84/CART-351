document.onscroll = function() {
  const specs = document.querySelector('#specs');
  const nav = document.querySelector('nav');
  
  if(specs.getBoundingClientRect().top <= 0) { // if the distance of the 'specs' section to the browser top is smaller than 0
    nav.classList.add('dark'); // add dark font color
  } else {
    nav.classList.remove('dark'); // remove dark  font color
  }
}