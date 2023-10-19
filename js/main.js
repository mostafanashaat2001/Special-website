// check local storage color
let mainColor = localStorage.getItem('color-option')
if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color' , mainColor );
}
// check local storage background
let backgroundOption = true;
let backgroundLocalItem = localStorage.getItem('background-option')
if(backgroundLocalItem !== null){
    document.querySelectorAll('.random-background span').forEach(element => {
        element.classList.remove('active')
    });
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
        document.querySelector('.random-background .yes').classList.add('active')
    }else{
        backgroundOption = false;
        document.querySelector('.random-background .no').classList.add('active')
    }

}

// settings box

// document.querySelector('.settings-box i').onclick = function (){
//     this.classList.toggle('fa-spin')
// };
let spin = document.querySelector('.settings-box i')
document.querySelector('.settings-box').onclick = function() {
    if (this.style.left === '-150px'){
        this.style.left = '0'
        spin.classList.add('fa-spin')
    }else{
        this.style.left = '-150px'
        spin.classList.remove('fa-spin')
    }
}
// change colors
let colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach(li => {
    li.addEventListener("click" , (e) =>{
        console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color );
        localStorage.setItem('color-option', e.target.dataset.color);
        handelActive(e);
    })
})
// switch background
let randomBackground = document.querySelectorAll('.random-background span');
randomBackground.forEach(span => {
    span.addEventListener("click" , (e) =>{
        handelActive(e);
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem('background-option' , true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background-option' , false);
        }
    })
})

// change background 

let landing = document.querySelector('.landing');
let images = ["01.jpg","02.webp","03.jpg","04.jpg",];
// randomBackground Option
// let backgroundOption = true;
let backgroundInterval;
function randomizeImg(){
    if(backgroundOption === true){

        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * images.length);

            landing.style.backgroundImage = 'url("images/' + images[randomNumber] + '")';

        },5000);
    }
};randomizeImg()

// display bullets
let navBullets = document.querySelector('.nav-bullets ')
let displayBullets = document.querySelectorAll('.display-bullets span')

displayBullets.forEach(span => {
    span.addEventListener("click" , (e) => {
        handelActive(e);
        if(e.target.dataset.bullet == 'yes'){
            navBullets.style.display = 'block'
        }else{
            navBullets.style.display = 'none'
        }
    })
})

// our skills

// let ourSkills = document.querySelector('.skills');
// window.onscroll = function () {
//     // skill offset top
//     let skillOffsetTop = ourSkills.OffsetTop;
//     // skill outre height
//     let skillOuterHeight = ourSkills.offsetHeight;
//     // window height
//     let windowHeight =this.innerHeight;
//     // window scroll top
//     let windowScrollTop = this.scrollY;
//     if(windowScrollTop > (skillOffsetTop + skillOuterHeight - windowHeight)){
//         let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
//         allSkills.forEach(skill => {
//             skill.style.width = skill.dataset.progress;
//         })
//     }

// }

window.onscroll = function (){
    if(scrollY !== '20000px'){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
        })
    }
}

// create popup image
let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        // create overlay
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        // create popupBox
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        // add alt
        if(img.alt !== null){
            let imgHeading = document.createElement('h3');
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        // create popup img
        let popupImg = document.createElement('img');
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        // create close span
        let closeButton = document.createElement('span');
        let closeText = document.createTextNode('X');
        closeButton.appendChild(closeText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    })
})

// close popup
document.addEventListener('click' , (e) => {
    if(e.target.className == 'close-button'){
        e.target.parentElement.remove();
        document.querySelector('.popup-overlay').remove();
    }
})
// function scroll
let allBullets = document.querySelectorAll('.nav-bullets .bullet');
let allLinks = document.querySelectorAll('.links a');

function scrollTo(elements){
    elements.forEach(ele => {
        ele.addEventListener('click' , (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
};
scrollTo(allLinks)
scrollTo(allBullets)

// function handel active

function handelActive(ev){
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
        ev.target.classList.add('active');
    })
}

// reset
let reset = document.querySelector('.reset-option');
reset.addEventListener('click', (e)=> {
    // localStorage.clear();
    localStorage.removeItem('color-option');
    localStorage.removeItem('background-option');
    location.reload();
});

// menu
let menuBtn = document.querySelector('.header .menu');
let tLinks = document.querySelector(".header .links");
menuBtn.onclick = function (e){
    // stop propagation
    e.stopPropagation();
    menuBtn.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
}
document.addEventListener('click' , (e) => {
    if(e.target !== menuBtn && e.target !== tLinks){
        if(tLinks.classList.contains('open')){
            menuBtn.classList.remove('menu-active');
            tLinks.classList.remove('open');
        }
    }
})
tLinks.onclick = function(e){
    e.stopPropagation();
}


// console.log(menu)


