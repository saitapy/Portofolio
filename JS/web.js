const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const form = document.querySelector('form');
const group = document.querySelector('.group');


for(let i = 1; i < 30; i++){
    const containerId = `iconContainer${i}`;
    const container = document.createElement('div');
    container.className = 'iconContainer';
    container.id = containerId;
    group.appendChild(container);
    addIcons(containerId)

}
function addIcons(containerId){
    const iconContainer = document.getElementById(containerId);
    const Unicode = [
        '\uf021',
        '\uf022',
        '\uf023',
        '\uf024',
        '\uf025',
        '\uf026',
        '\uf027',
        '\uf028',
        '\uf029',
        '\uf030',
        '\uf031',
        '\uf032',
        '\uf033',
        '\uf034',
        '\uf035',
        '\uf036',
        '\uf037',
        '\uf038',
        '\uf039',
        '\uf040',
    ];
    
    
    for (let i = 1; i < 50; i++){
        const icon = document.createElement('i');
        icon.className = 'icon fas';
        icon.innerHTML = randomIcon(Unicode);
        iconContainer.appendChild(icon);
    }
    
}  


// fungsi untuk membuat fontawesome secara random

function randomIcon(values){
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}
  


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}


window.addEventListener("scroll", function(){
    var header = this.document.querySelector("header");
    header.classList.toggle("stiky", window.scrollY > 0);
})