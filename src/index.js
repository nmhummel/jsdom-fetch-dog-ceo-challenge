console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    
    function getImages() {
        const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
        fetch(imgUrl)
        .then(resp => resp.json())
        .then (json => {
            json.message.forEach(dogImages => renderImages(dogImages))
        });
    }

    function renderImages(dogImages) {
        const dogImageContainer = document.getElementById("dog-image-container");
        const imgSrc = document.createElement('img');
        imgSrc.src = dogImages;
        dogImageContainer.appendChild(imgSrc);
    }
    
    function loadBreedOptions() {
        const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        fetch(breedUrl)
          .then(res => res.json())
          .then(results => {
            breeds = Object.keys(results.message);
            updateBreedList(breeds);
            addBreedSelectListener();
        });
    }
      
    function updateBreedList(breeds) {
        let ul = document.getElementById('dog-breeds');
        removeChildren(ul);
        breeds.forEach(breed => addBreed(breed));
    }
      
    function removeChildren(ele) {
        let child = ele.lastElementChild;
        while (child) {
            ele.removeChild(child);
            child = ele.lastElementChild;
        }
    }
    
    function selectBreedsStartingWith(letter) {
        updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
    }
    
    function addBreedSelectListener() {
        let breedDropdown = document.getElementById('breed-dropdown');
        breedDropdown.addEventListener('change', function (e) {
         selectBreedsStartingWith(e.target.value);
        });
    }
    
    function addBreed(breed) {
        let ul = document.getElementById('dog-breeds');
        let li = document.createElement('li');
        li.innerText = breed;
        li.style.cursor = 'pointer';
        ul.appendChild(li);
        li.addEventListener('click', updateColor);
    }
      
    function updateColor(e) {
        e.target.style.color = 'green';
    }

    getImages();
    loadBreedOptions();

});

// write code to create dropdown here. 

