
const imageContainer = document.getElementById('image__container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API 
const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=ppnOF1TpVBcCy5BOZcVWQ5BG0IBNpbZ7nVXqO39Z4nU&count=30';

// Check if all images 
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//  Create Elements for links 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
     photosArray.forEach((photo) => {
         // create <a> to link unsplash
         const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <image> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // put <img> inside <a>
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);

     });
}

// get photoes unsplash API

async function getPhotoes() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // cetch error here
    }
}

// Check to see if scrolling 
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotoes();
    }
})

// on load 
getPhotoes();