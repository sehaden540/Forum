function submitForm(event) {
    event.preventDefault();
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var post = {
        subject:subject, message:message
    }
    localStorage.setItem("posts",JSON.stringify(post))
    console.log (post);
    return false;
}
