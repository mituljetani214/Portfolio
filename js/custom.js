/// cusrsor animation
var cursor = $(".cursor"),
follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
        css: {
        left: posX - 12,
        top: posY - 12
        }
    });

    TweenMax.set(cursor, {
        css: {
        left: mouseX,
        top: mouseY
        }
    });
  }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
// yellow circle
$(".link").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
});
$(".link").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
});

/// Banner aimation 
const hero = document.querySelector('[data-hero]')
const MASK_SIZE = 13;
/* Timeline */
const tl = gsap.timeline()

tl
  .to(hero, {
    '--maskSize1': '13%',
    duration: 0.5,
    ease: 'back.out(2)',
  })
/* Cursor */
gsap
.timeline({ delay: 1 }) //
.to(
  hero.current, //
  { '--maskSize1': `${MASK_SIZE}%`, duration: 0.5, ease: 'back.out(2)' }
);

document.querySelector('[data-hero]').addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e
  const hero = document.querySelector('[data-hero]')
  let height = hero.offsetHeight;
    
  const x = Math.round((clientX / window.innerWidth) * 100)
  const y = Math.round((e.layerY / height) * 100)
  const size = e.clientY + window.scrollY < 700 ? MASK_SIZE : 0;
  gsap.to(hero, {
    '--x': `${x}%`,
    '--y': `${y}%`,
    '--maskSize1': `${size}%`,
    duration: 0.3,
    ease: 'sine.out',
  })
})


/// Menu animation aimation
$(function(){
 var lastScrollTop = 0, delta = 5;
 $(window).scroll(function(){
   var nowScrollTop = $(this).scrollTop();

   if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
    if (nowScrollTop > lastScrollTop){
      document.querySelector(".menu-animation ul").style.transform = "skewX(17deg)";

      // document.querySelector(".menu-animation li").style.transform = "translateX(" + (value++ + 10) + "px)";
      setTimeout(function(){
          document.querySelector(".menu-animation ul").style.transform = "skewX(0deg)";
      }, 500);
    } else {
      document.querySelector(".menu-animation ul").style.transform = "skewX(-17deg)";
      // document.querySelector(".menu-animation li").style.transform = "translateX(10px)";
      setTimeout(function(){
          document.querySelector(".menu-animation ul").style.transform = "skewX(0deg)";
      }, 500);
    }
   lastScrollTop = nowScrollTop;
   }
 });
});

var counter = 0;
var lastPointScroll = 0;
$(window).scroll(function(){
    var a = $(this).scrollTop();
    if(a == 0)
      var counterIncrement = counter = 0;
    else if(a > lastPointScroll)
      var counterIncrement = counter -= 0.3;
    else
      var counterIncrement = counter += 0.3;
   
      
    lastPointScroll = a;
    document.querySelector(".menu-animation-left").style.transform = "translateX(" + counterIncrement.toFixed(1) + "px)";
})



// Scroll animation
var scroll = window.requestAnimationFrame ||
function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

function loop() {
    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });
    scroll(loop);
}
loop();
function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}


// mouce wheel scroll animation
function init(){
  new SmoothScroll(document,120,12)
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
  var moving = false
  var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
  target.addEventListener('mousewheel', scrolled, { passive: false })
  target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e)

    pos += -delta * speed
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

    if (!moving) update()
  }

  function normalizeWheelDelta(e){
    if(e.detail){
      if(e.wheelDelta)
        return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
      else
        return -e.detail/3 // Firefox
    }else
      return e.wheelDelta/120 // IE,Safari,Chrome
  }

  function update() {
    moving = true
    
    var delta = (pos - target.scrollTop) / smooth
    
    target.scrollTop += delta
    
    if (Math.abs(delta) > 0.5)
      requestFrame(update)
    else
      moving = false
  }

  var requestFrame = function() { // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  }()
}

// mobile menu
$('.menu-icon').on('click', function(e) {
  $('html').toggleClass("menu-open"); //you can list several class names 
  e.preventDefault();
});