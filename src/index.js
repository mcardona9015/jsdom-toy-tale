let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
});

//fetch toys//

const url = "http://localhost:3000/toys"
let toysData
const toyCollection = document.querySelector('#toy-collection')

function fetchToys() {
  fetch(url)
  .then(response => response.json())
  .then(data => toysData = data)
  .then(toysData => renderAllToys(toysData))
}

function renderOneToy(toyObject) {
  const card = document.createElement('div')
  card.classList = 'card'
  card.dataset.id = toyObject.id

  const h2 = document.createElement('h2')
  h2.innerText = toyObject.name

  const image = document.createElement('img')
  image.src = toyObject.image
  image.alt = toyObject.name
  image.classList = 'toy-avatar'

  const likes = document.createElement('p')
  likes.innerText = `${toyObject.likes} Likes`

  const likeButton = document.createElement('button')
  likeButton.innerText = "Like ❤️"
  likeButton.classList = 'like-btn'

  card.append(h2, image, likes, likeButton)
  toyCollection.append(card)
}

function renderAllToys(toysArray) {
  toysArray.forEach(toy => {
    renderOneToy(toy)
  })
}

//create toys//

const createToyForm = document.querySelector('.add-toy-form')

createToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = e.target.name.value
  const image = e.target.image.value
  const likes = 0

  const newToy = {name, image, likes}

  renderOneToy(newToy)
  e.target.reset()

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    } ,

    body: JSON.stringify(newToy),
  })


})

// INCREASE LIKES //

//const likeBtn = document.getElementsByClassName('.like-btn')

toyCollection.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn'){
    const toyCard = e.target.closest('div')
    
    const getLikes = e.target.previousElementSibling
    let numOfLikes = parseInt(getLikes.innerText) 
    const likes = getLikes.innerText = `${numOfLikes + 1} Likes`
    
    fetch(`${url}/${toyCard.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes})
    })

  
  }
  
  

})