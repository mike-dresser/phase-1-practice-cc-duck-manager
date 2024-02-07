// When the page loads, fetch the ducks and display each duck image in the `#duck-nav`. You may need to do something to make sure your `script` tag is working in the HTML first...

// check page load
let duckNav = document.querySelector('#duck-nav');
//fetch ducks
fetch('http://localhost:3000/ducks')
  .then((res) => res.json())
  .then((ducks) => {
    console.log(ducks);

    // grab '#duck-nav'

    //display EACH duck image (iterate over response, grab each duck image, add image to the DOM)
    for (let duck of ducks) {
      addDuckNav(duck);
    }
  });

function addDuckNav(duck) {
  let imageUrl = duck.img_url;
  let image = document.createElement('img');
  image.src = imageUrl;
  image.addEventListener('click', () => {
    duckDisplay(duck);
  });
  duckNav.append(image);
}

function duckDisplay(duck) {
  let duckDisplayDiv = document.querySelector('#duck-display');

  duckDisplayDiv.innerHTML = `
     <h2>${duck.name}</h2>

    <img src="${duck.img_url}" />

    <button id="duck-display-likes">${duck.likes} likes</button>
  `;

  let likeButton = document.querySelector('#duck-display-likes');
  likeButton.addEventListener('click', () => {
    addLike(duck, likeButton);
  });
}

function addLike(duck, button) {
  duck.likes++;
  console.log(duck.likes);
  fetch(`http://localhost:3000/ducks/${duck.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ likes: duck.likes }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      button.textContent = `${data.likes} Likes`;
    });
}

const duckForm = document.querySelector('#new-duck-form');
duckForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event.target[0].value);
  let newName = event.target[0].value;
  let newUrl = event.target[1].value;
  let displayObj = { name: newName, img_url: newUrl, likes: 0 };
  addDuckNav(displayObj);
});

// event.target[0].value = name

// When the `#new-duck-form` is submitted, it generates a new duck image in the `#duck-nav`. When clicked, it acts like the other images in the `#duck-nav` and shows a name, image, and like button in the `#duck-display`. No persistence is needed. A duck starts with 0 likes.
