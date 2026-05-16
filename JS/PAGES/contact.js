let regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexUser = /^[a-zA-Z]{3,}$/;

let email = document.getElementById("mail");
let messageMail = document.getElementById("messageEmail");
let name = document.getElementById("user");
let messageName = document.getElementById("messageName");

email.addEventListener("input", function () {

    if (regexMail.test(email.value)) {
        email.style.color = "black";
        messageMail.textContent = "";
    } else {
        messageMail.textContent = "Correo inválido";
        messageMail.style.color = "red";
        email.style.color = "red";
    }
});

name.addEventListener("input", function () {

    if (regexUser.test(name.value)) {
        name.style.color = "black";
        messageName.textContent = "";
    } else {
        messageName.textContent = "Nombre inválido";
        messageName.style.color = "red";
        name.style.color = "red";
    }
});