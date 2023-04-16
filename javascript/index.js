const descriptionBar = document.querySelector('.description-bar');
const words = descriptionBar.innerHTML.split(' ');

// helper function to change color and font size of a word
function changeWordStyle(word) {
  word.style.color = '#FFB6C1';
  word.style.fontSize = '1.5em';
}

// add mouseover event listener to each word
words.forEach(word => {
  const newSpan = document.createElement('span');
  newSpan.innerHTML = word + ' ';
  newSpan.addEventListener('mouseover', () => {
    changeWordStyle(newSpan);
  });
  newSpan.addEventListener('mouseout', () => {
    newSpan.style.color = 'black';
    newSpan.style.fontSize = '1em';
  });
  descriptionBar.appendChild(newSpan);
});
