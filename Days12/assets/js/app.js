const header  = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
let zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const links = document.querySelectorAll(".links .nav-link");


window.addEventListener("scroll", () => {
    activeLink();
    if(!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounter();
}); 

function updateCount (num, maxNum){
    let currenNum = +num.innerText;
 
    if(currenNum < maxNum) {
        num.innerText = currenNum + 1 ;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12); 
    }
}
// Sticky Navbar

function stickyNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

// -------------------- Reveal Animation -----------------

let sr = ScrollReveal({
    duration:2500,
    distance:"50px",
});
sr.reveal(".showcase-info", {
    delay:600,
});
sr.reveal(".showcase-image",{
    origin:"0.5s", delay:700
})
// -------------------- Skills  animition  -----------------


function hasReached(el) {
    var topPosition = el.getBoundingClientRect().top;

    if(window.innerHeight >= topPosition + el.offsetHeight) return true;
        return false;

}

let skillsPlayed = false;
function skillsCounter() {
    if(!hasReached(first_skill)) return ;

sk_counters.forEach((counter, i) => { 
    let target = + counter.dataset.target;
    let strokeValue = 427 - 427 * (target /100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout (() => {
        updateCount(counter, target);
    }, 400 );
});

progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
);
}



// --------------------- Services Counter Animation ---------- 

let mlPlayed = true; 
function mlCounter() {
    if(!hasReached(ml_section)) return ;
    mlPlayed = true;
    ml_counters.forEach(ctr => {
        let target = +ctr.dataset.target;
        setTimeout(()=>{
            updateCount(ctr, target);
        },400);

    });
    
}

// --------------------- Protfolio Filter Animation ----------  
var mixer = mixitup(".portfolio-gallery",{
    selectors : {
        target : ".prt-card", 
    },
    animation : {
        duration:500,
    },
});

// --------------------- Modal Pop Up Animation Animation ----------  


let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopSrcolling"); 
        currentIndex = i;
        changeImage(currentIndex);
    })
);
modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open")
    document.body.classList.add("stopSrcolling");


});

prev_btn.addEventListener("click", () => {
    if(currentIndex === 5){
        currentIndex = 0;
    }else {
        currentIndex++;
    }
    changeImage(currentIndex);
});
next_btn.addEventListener("click", () => {
    if(currentIndex === 5){
        currentIndex = 0;
    }else {
        currentIndex++;
    }
    changeImage(currentIndex);
})
function changeImage(index)  {

    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");

}

// --------------------- Modal Pop Up Animation Animation ----------  

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 400,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable:true, 
    },
});


// --------------------- change active link on scroll ---------- 
function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
    .map((sct, i) => {
        return { 
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })
    .filter(sct => sct.y <= 0);

    let currSectionID = passedSections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}
activeLink();