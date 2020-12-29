//function that allowed for the posts to be uploaded into local storage
function submitForm(event) {
    event.preventDefault();
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var post = {
        subject: subject, message: message
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

        var textMessage = document.createElement("p");
        textMessage.classList.add("card-text");
        //textMessage.setAttribute("id", "id1");
        textMessage.insertAdjacentHTML('beforeend', post.allPosts[i].message);

        var textSubject = document.createElement("p");
        textSubject.classList.add("card-title");
        //textSubject.setAttribute("id", "id2")
        textSubject.appendChild(document.createTextNode(post.allPosts[i].subject));

        cardBody.appendChild(textSubject);
        cardBody.appendChild(textMessage);
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
