// ==========================================
// Lab 7 - Asynchronous JavaScript
// XHR, Fetch Promises, Async/Await
// ==========================================


// ------------------------------------------
// DOM Elements
// ------------------------------------------

const searchInput =
    document.getElementById("search-input");

const xhrButton =
    document.getElementById("xhr-button");

const fetchButton =
    document.getElementById("fetch-button");

const asyncButton =
    document.getElementById("async-button");

const imageGallery =
    document.getElementById("image-gallery");

const statusMessage =
    document.getElementById("status-message");


// ------------------------------------------
// Unsplash API Settings
// ------------------------------------------

const API_URL =
    "https://api.unsplash.com/search/photos";


// Get the API key without storing it in GitHub
function getAccessKey() {

    let key =
        sessionStorage.getItem(
            "unsplashAccessKey"
        );


    if (!key) {

        key = prompt(
            "Enter your Unsplash Access Key:"
        );


        if (key) {

            sessionStorage.setItem(
                "unsplashAccessKey",
                key.trim()
            );
        }
    }


    return key;
}


// ------------------------------------------
// Get Search Query
// ------------------------------------------

function getSearchQuery() {

    const query =
        searchInput.value.trim();


    if (query === "") {

        statusMessage.textContent =
            "Please enter a search term.";

        return null;
    }


    return query;
}


// ------------------------------------------
// Build API URL
// ------------------------------------------

function buildURL(query) {

    return (
        API_URL +
        "?query=" +
        encodeURIComponent(query) +
        "&per_page=8&content_filter=high"
    );
}


// ------------------------------------------
// Display Photos Using DOM API
// ------------------------------------------

function displayPhotos(photos) {

    imageGallery.innerHTML = "";


    if (photos.length === 0) {

        statusMessage.textContent =
            "No photos found.";

        return;
    }


    photos.forEach(function (photo) {

        const card =
            document.createElement("article");

        card.classList.add(
            "photo-card"
        );


        const image =
            document.createElement("img");

        image.src =
            photo.urls.small;

        image.alt =
            photo.alt_description ||
            "Unsplash photo";

        image.loading =
            "lazy";


        const info =
            document.createElement("div");

        info.classList.add(
            "photo-info"
        );


        const photographerText =
            document.createElement("span");

        photographerText.textContent =
            "Photo by ";


        const photographerLink =
            document.createElement("a");

        photographerLink.textContent =
            photo.user.name;

        photographerLink.href =
            photo.user.links.html +
            "?utm_source=cpit405_lab7&utm_medium=referral";

        photographerLink.target =
            "_blank";

        photographerLink.rel =
            "noopener noreferrer";


        const unsplashText =
            document.createTextNode(
                " on "
            );


        const unsplashLink =
            document.createElement("a");

        unsplashLink.textContent =
            "Unsplash";

        unsplashLink.href =
            "https://unsplash.com/?utm_source=cpit405_lab7&utm_medium=referral";

        unsplashLink.target =
            "_blank";

        unsplashLink.rel =
            "noopener noreferrer";


        info.appendChild(
            photographerText
        );

        info.appendChild(
            photographerLink
        );

        info.appendChild(
            unsplashText
        );

        info.appendChild(
            unsplashLink
        );


        card.appendChild(
            image
        );

        card.appendChild(
            info
        );

        imageGallery.appendChild(
            card
        );
    });
}


// ------------------------------------------
// Handle Errors
// ------------------------------------------

function showError(message) {

    imageGallery.innerHTML = "";

    statusMessage.textContent =
        message;
}


// ==========================================
// METHOD 1: XMLHttpRequest
// ==========================================

function searchUsingXHR() {

    const query =
        getSearchQuery();

    if (!query) {
        return;
    }


    const accessKey =
        getAccessKey();

    if (!accessKey) {

        showError(
            "Access Key is required."
        );

        return;
    }


    statusMessage.textContent =
        "Loading with XMLHttpRequest...";


    const xhr =
        new XMLHttpRequest();


    xhr.open(
        "GET",
        buildURL(query),
        true
    );


    xhr.setRequestHeader(
        "Authorization",
        "Client-ID " + accessKey
    );


    xhr.onload = function () {

        if (
            xhr.status >= 200 &&
            xhr.status < 300
        ) {

            const data =
                JSON.parse(
                    xhr.responseText
                );


            displayPhotos(
                data.results
            );


            statusMessage.textContent =
                "Results loaded using XMLHttpRequest.";

        } else {

            showError(
                "XHR request failed. Status: " +
                xhr.status
            );
        }
    };


    xhr.onerror = function () {

        showError(
            "Network error while using XMLHttpRequest."
        );
    };


    xhr.send();
}


// ==========================================
// METHOD 2: Fetch With Promises
// ==========================================

function searchUsingFetch() {

    const query =
        getSearchQuery();

    if (!query) {
        return;
    }


    const accessKey =
        getAccessKey();

    if (!accessKey) {

        showError(
            "Access Key is required."
        );

        return;
    }


    statusMessage.textContent =
        "Loading with Fetch Promises...";


    fetch(
        buildURL(query),
        {
            headers: {
                Authorization:
                    "Client-ID " +
                    accessKey
            }
        }
    )

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );
        }


        return response.json();
    })

    .then(function (data) {

        displayPhotos(
            data.results
        );


        statusMessage.textContent =
            "Results loaded using Fetch Promises.";
    })

    .catch(function (error) {

        showError(
            "Fetch error: " +
            error.message
        );
    });
}


// ==========================================
// METHOD 3: Fetch With Async/Await
// ==========================================

async function searchUsingAsyncAwait() {

    const query =
        getSearchQuery();

    if (!query) {
        return;
    }


    const accessKey =
        getAccessKey();

    if (!accessKey) {

        showError(
            "Access Key is required."
        );

        return;
    }


    statusMessage.textContent =
        "Loading with Async/Await...";


    try {

        const response =
            await fetch(
                buildURL(query),
                {
                    headers: {
                        Authorization:
                            "Client-ID " +
                            accessKey
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );
        }


        const data =
            await response.json();


        displayPhotos(
            data.results
        );


        statusMessage.textContent =
            "Results loaded using Async/Await.";

    } catch (error) {

        showError(
            "Async/Await error: " +
            error.message
        );
    }
}


// ------------------------------------------
// Button Events
// ------------------------------------------

xhrButton.addEventListener(
    "click",
    searchUsingXHR
);


fetchButton.addEventListener(
    "click",
    searchUsingFetch
);


asyncButton.addEventListener(
    "click",
    searchUsingAsyncAwait
);


// ------------------------------------------
// Keyboard Event
// Press Enter to search using Async/Await
// ------------------------------------------

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchUsingAsyncAwait();
        }
    }
);
