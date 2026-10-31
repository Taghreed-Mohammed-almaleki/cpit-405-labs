// ==========================================
// Lab 6 - JavaScript Events, DOM and Cookies
// ==========================================


// ------------------------------------------
// DOM Elements
// ------------------------------------------

const likeButton =
    document.getElementById("like-button");

const dislikeButton =
    document.getElementById("dislike-button");

const likeCountElement =
    document.getElementById("like-count");

const dislikeCountElement =
    document.getElementById("dislike-count");

const commentInput =
    document.getElementById("comment-input");

const submitCommentButton =
    document.getElementById("submit-comment");

const clearButton =
    document.getElementById("clear-button");

const commentsList =
    document.getElementById("comments-list");

const voteMessage =
    document.getElementById("vote-message");

const commentMessage =
    document.getElementById("comment-message");


// ------------------------------------------
// Initial Values
// ------------------------------------------

const INITIAL_LIKES = 100;
const INITIAL_DISLIKES = 20;

let likes = INITIAL_LIKES;
let dislikes = INITIAL_DISLIKES;

let comments = [];


// ------------------------------------------
// Cookie Functions
// ------------------------------------------

function setCookie(name, value, days = 7) {

    const date = new Date();

    date.setTime(
        date.getTime() +
        days * 24 * 60 * 60 * 1000
    );

    document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        "; expires=" +
        date.toUTCString() +
        "; path=/; SameSite=Lax";
}


function getCookie(name) {

    const cookieName = name + "=";

    const cookies =
        document.cookie.split(";");

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (
            cookie.indexOf(cookieName) === 0
        ) {

            return decodeURIComponent(
                cookie.substring(
                    cookieName.length
                )
            );
        }
    }

    return null;
}


function deleteCookie(name) {

    document.cookie =
        name +
        "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


// ------------------------------------------
// Update Counter UI
// ------------------------------------------

function updateCounters() {

    likeCountElement.textContent =
        likes;

    dislikeCountElement.textContent =
        dislikes;
}


// ------------------------------------------
// Disable / Enable Voting
// ------------------------------------------

function disableVoting() {

    likeButton.disabled = true;
    dislikeButton.disabled = true;
}


function enableVoting() {

    likeButton.disabled = false;
    dislikeButton.disabled = false;
}


// ------------------------------------------
// Handle Like
// ------------------------------------------

likeButton.addEventListener(
    "click",
    function () {

        const existingVote =
            getCookie("lab6Vote");

        if (existingVote) {

            voteMessage.textContent =
                "You have already voted.";

            return;
        }


        likes++;

        updateCounters();


        setCookie(
            "lab6Vote",
            "like"
        );

        setCookie(
            "lab6Likes",
            likes
        );

        setCookie(
            "lab6Dislikes",
            dislikes
        );


        voteMessage.textContent =
            "Your like has been recorded.";

        disableVoting();
    }
);


// ------------------------------------------
// Handle Dislike
// ------------------------------------------

dislikeButton.addEventListener(
    "click",
    function () {

        const existingVote =
            getCookie("lab6Vote");

        if (existingVote) {

            voteMessage.textContent =
                "You have already voted.";

            return;
        }


        dislikes++;

        updateCounters();


        setCookie(
            "lab6Vote",
            "dislike"
        );

        setCookie(
            "lab6Likes",
            likes
        );

        setCookie(
            "lab6Dislikes",
            dislikes
        );


        voteMessage.textContent =
            "Your dislike has been recorded.";

        disableVoting();
    }
);


// ------------------------------------------
// Display Comments
// ------------------------------------------

function displayComments() {

    commentsList.innerHTML = "";


    comments.forEach(
        function (comment) {

            const commentElement =
                document.createElement("div");

            commentElement.classList.add(
                "comment-item"
            );


            commentElement.textContent =
                comment;


            commentsList.appendChild(
                commentElement
            );
        }
    );
}


// ------------------------------------------
// Submit Comment
// ------------------------------------------

submitCommentButton.addEventListener(
    "click",
    function () {

        const existingComment =
            getCookie("lab6Comment");

        if (existingComment) {

            commentMessage.textContent =
                "You have already submitted a comment.";

            return;
        }


        const comment =
            commentInput.value.trim();


        if (comment === "") {

            commentMessage.textContent =
                "Please write a comment first.";

            return;
        }


        comments.push(comment);


        setCookie(
            "lab6Comment",
            comment
        );


        setCookie(
            "lab6Comments",
            JSON.stringify(comments)
        );


        displayComments();


        commentInput.value = "";

        commentInput.disabled = true;

        submitCommentButton.disabled = true;


        commentMessage.textContent =
            "Your comment has been saved.";
    }
);


// ------------------------------------------
// Reset / Clear
// ------------------------------------------

clearButton.addEventListener(
    "click",
    function () {

        deleteCookie(
            "lab6Vote"
        );

        deleteCookie(
            "lab6Likes"
        );

        deleteCookie(
            "lab6Dislikes"
        );

        deleteCookie(
            "lab6Comment"
        );

        deleteCookie(
            "lab6Comments"
        );


        likes = INITIAL_LIKES;

        dislikes = INITIAL_DISLIKES;

        comments = [];


        updateCounters();

        displayComments();


        enableVoting();


        commentInput.disabled = false;

        submitCommentButton.disabled = false;

        commentInput.value = "";


        voteMessage.textContent =
            "Vote has been reset.";

        commentMessage.textContent =
            "Comments have been cleared.";
    }
);


// ------------------------------------------
// Load Saved State From Cookies
// ------------------------------------------

function loadSavedState() {

    const savedLikes =
        getCookie("lab6Likes");

    const savedDislikes =
        getCookie("lab6Dislikes");

    const savedVote =
        getCookie("lab6Vote");

    const savedComments =
        getCookie("lab6Comments");

    const savedComment =
        getCookie("lab6Comment");


    if (savedLikes !== null) {

        likes =
            Number(savedLikes);
    }


    if (savedDislikes !== null) {

        dislikes =
            Number(savedDislikes);
    }


    if (savedVote) {

        disableVoting();

        voteMessage.textContent =
            "You already voted: " +
            savedVote +
            ".";
    }


    if (savedComments) {

        try {

            comments =
                JSON.parse(
                    savedComments
                );

        } catch (error) {

            comments = [];
        }
    }


    if (savedComment) {

        commentInput.disabled = true;

        submitCommentButton.disabled = true;

        commentMessage.textContent =
            "You have already submitted a comment.";
    }


    updateCounters();

    displayComments();
}


// ------------------------------------------
// Initial Page Setup
// ------------------------------------------

loadSavedState();

