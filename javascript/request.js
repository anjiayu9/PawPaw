function getCatImageSource(color) {
  switch (color) {
    case 'Black':
      return '../sources/cat1.png';
    case 'Gray':
      return '../sources/cat4.png';
    case 'White':
      return '../sources/cat3.png';
    case 'Calico':
      return '../sources/cat2.png';
    case 'Tabby':
      return '../sources/cat6.png';
    case 'Orange':
      return '../sources/cat5.png';
    default:
      return '../sources/cat3.png';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cat-form');
  const catCards = document.getElementById('cat-cards');

  fetch('../data/cats.json') // Update the path here
    .then(response => response.json())
    .then(cats => {
      const displayCats = (cats) => {
        catCards.innerHTML = '';

        cats.forEach(cat => {
          const card = document.createElement('div');
          card.classList.add('card');

          const img = document.createElement('img');
          img.src = getCatImageSource(cat.color);
          img.alt = 'Cat';

          const name = document.createElement('h3');
          name.textContent = cat.name;

          const color = document.createElement('p');
          color.textContent = `Color: ${cat.color}`;

          const age = document.createElement('p');
          age.textContent = `Age: ${cat.age}`;

          card.append(img, name, color, age);
          catCards.appendChild(card);
        });
      };

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const color = form.querySelector('#color').value;
        const age = form.querySelector('#age').value;

        const filteredCats = cats.filter(cat => {
          return (color === '' || cat.color === color) && (age === '' || cat.age === age);
        });

        displayCats(filteredCats);
      });

      displayCats(cats);
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
    });
});
