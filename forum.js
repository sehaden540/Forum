//function that creates and allows for new posts to be uploaded into local storage
function submitForm(event) {
    event.preventDefault();
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var post = {
        subject: subject,
        message: message,
        likes: 0
    }
    let posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts) {
        posts = {
            allPosts: []
        }
    }
    posts["allPosts"].push(post)
    localStorage.setItem("posts", JSON.stringify(posts))
    window.location.href = "file:///C:/Users/sgall/Documents/Web%20Development/Forum/index.html";
}

window.onload = function () {
    loadPosts();
};

function createMessage(message) {
    var textMessage = document.createElement("p");
    textMessage.classList.add("card-text");
    //textMessage.setAttribute("id", "id1");
    textMessage.insertAdjacentHTML('beforeend', message);
    return textMessage
}

function createSubject(subject) {
    var textSubject = document.createElement("p");
    textSubject.classList.add("card-title");
    //textSubject.setAttribute("id", "id2")
    textSubject.appendChild(document.createTextNode(subject));
    return textSubject
}

function createLike(likes, index) {
    var buttonDiv = document.createElement("div");
    //var like = document.createElement("p")
    //like.innerHTML = likes;
    var button = document.createElement("button");
    button.innerHTML = likes > 0? likes : "Like";
    button.onclick = () => increaseLikes(index)
    button.classList.add("btn");
    button.classList.add("like-button");
    buttonDiv.classList.add("like-div");
    //buttonDiv.appendChild(like);
    buttonDiv.appendChild(button);
    return buttonDiv
}

function increaseLikes(index) {
    var posts = JSON.parse(localStorage.getItem("posts"));
    posts.allPosts[index].likes +=1;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

function createReply() {
    var button = document.createElement("button");
    button.innerHTML = "Reply";
    button.classList.add("btn")
    button.classList.add("btn-outline-light")
    button.classList.add("reply-button");
    return button
}

//function that allows for the posts submitted to be loaded on the main Forum page
function loadPosts() {
    removeAllChildNodes(document.getElementById("posts")); //this removes all elements so we do not see duplicate posts on the screen
    var tree = document.createDocumentFragment();
    const post = JSON.parse(localStorage.getItem("posts"))
    for (let i = post.allPosts.length - 1; i >= 0; i--) {
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var textMessage = createMessage(post.allPosts[i].message);
        var textSubject = createSubject(post.allPosts[i].subject);
        var likeButton = createLike(post.allPosts[i].likes, i); 
        var replyButton = createReply();

        cardBody.appendChild(textSubject);
        cardBody.appendChild(textMessage);
        cardBody.appendChild(likeButton);
        cardBody.appendChild(replyButton);
        cardDiv.appendChild(cardBody);
        tree.appendChild(cardDiv);
    }
    document.getElementById("posts").appendChild(tree);
}

//function that removes all elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

setInterval(function () {
    loadPosts();
}, 30000);

