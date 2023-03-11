// smooth-scroll + menu burger

const ids = document.querySelectorAll('section[id]');
const links = document.querySelectorAll(".menu-header__link, .logo");

const burgerMenuBtn = document.querySelector(`.icon-menu`);
const headerEl = document.querySelector(`.header`);

burgerMenuBtn.addEventListener(`click`, function() {
    headerEl.classList.toggle(`menu-open`);
})


for (const link of links) {
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    headerEl.classList.remove(`menu-open`);
    const linkAttribute = this.getAttribute("href").replace(`#`, ``);
    for (const id of ids) {
        const idAttribute = id.getAttribute("id");
        hasAttr(e, linkAttribute, idAttribute);
    }
}

function hasAttr(e, linkAttribute, idAttribute) {
    if (linkAttribute === idAttribute) {
        e.preventDefault();
        const offsetTop = document.querySelector(`#` + linkAttribute).offsetTop - 80;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    } else {
        headerEl.classList.remove(`menu-open`);
    }
}


// Slider

const swiper = new Swiper('.slider-portfolio', {
    loop: true,


    // Navigation arrows
    navigation: {
        nextEl: '.buttons-portfolio__btn.swiper-button-next',
        prevEl: '.buttons-portfolio__btn.swiper-button-prev',
    },

    autoHeight: true

});


// Tabs

document.querySelectorAll(`.tabs-expericed__btn`).forEach(item => {
    item.addEventListener(`click`, function(e) {
        e.preventDefault();

        const id = e.target.getAttribute('href').replace(`#`, ``);

        document.querySelectorAll(`.tabs-expericed__btn`).forEach(child => {
            child.classList.remove(`active`)
        });
        
        document.querySelectorAll(`.content-experices`).forEach(child => {
            child.classList.remove(`active`)
        });

        item.classList.add(`active`);
        
        document.getElementById(id).classList.add(`active`);
    })
});


// Form validation

const form = document.getElementById(`form`);
form.addEventListener(`submit`, formSend);

async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error === 0) {

    } else {
        alert(`Fill out form.`)
    }
}

function formValidate(form) { 
    let error = 0;
    let formReq = document.querySelectorAll(`._req`);

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);
        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
                alert(`fill out email correctly`)
            }
        }else {
            if (input.value === '') {
                formAddError(input);
                error++;

            }
        }
    }
    return error;
}


function formAddError(input) {
    input.parentElement.classList.add(`_error`);
    input.classList.add(`_error`);
}

function formRemoveError(input) {
    input.parentElement.classList.remove(`_error`);
    input.classList.remove(`_error`);
}

function emailTest(input) {
    return  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


// Lazyload for images

const lazyImages = document.querySelectorAll(`img[data-src]`);
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];

if(lazyImages.length>0) {
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
            lazyScrollCheck();
        }
    });
}

window.addEventListener(`scroll`, lazyScroll)

function lazyScroll() {
    if (document.querySelectorAll(`img[data-src]`).length > 0) {
        lazyScrollCheck();
    }
}


function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => scrollY > item - windowHeight
    );
    if (imgIndex >=0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute(`data-src`);
        }
        delete lazyImagesPositions[imgIndex];

    }
}