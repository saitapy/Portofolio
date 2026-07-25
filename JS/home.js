

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const form = document.querySelector('form');


function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "saitapypresent@gmail.com",
        Password : "F2D315DE966B392140856EDDCFFC89184917",
        To : 'saitapypresent@gmail.com',
        From : "saitapypresent@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(message => alert(message));

}

function checkInputs(){
    const items = document.querySelectorAll(".item");

for (const item of items){
    if (item.value == ""){
        item.classList.add("error");
        item.parentElemnt.classList.add("error");
    }
}
    
}

window.addEventListener("scroll", function(){
    var header = this.document.querySelector("header");
    header.classList.toggle("stiky", window.scrollY > 0);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.checkInputs();


    // sendEmail();
});

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}