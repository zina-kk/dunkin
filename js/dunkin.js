document.addEventListener("DOMContentLoaded", ()=> {
    // 메뉴
    const mainMenu = [...document.getElementsByClassName('mainMenu')];
    const bg = document.getElementById('bg');
    mainMenu.forEach(i => {
        i.addEventListener("mouseenter", ()=> {
            mainMenu.forEach(j => {
                if (j.nextElementSibling) {
                    j.nextElementSibling.style.display = "none";
                    bg.style.display = "none";
                }
            });
            if (i.nextElementSibling) {
                i.nextElementSibling.style.display = "block";
                bg.style.display = "block";
            }
        });

        if (i.nextElementSibling) {
                i.nextElementSibling.addEventListener("mouseleave", () => {
                    i.nextElementSibling.style.display = "none";
                    bg.style.display = "none";
                });
        }

    });


    const input = document.querySelector('#tog input');
    input.addEventListener("click" , ()=>{
        if(input.checked === true){
            input.parentElement.classList.add('act');
            input.previousElementSibling.textContent = 'BRAND'; 
        }else{
            input.parentElement.classList.remove('act');
             input.previousElementSibling.textContent = '창업문의'; 
        }
        
    });


  const slide = document.getElementById('slide');
  const wrapper = document.getElementById('slideWrapper');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');

  const slides = slide.querySelectorAll('a');
  const slideCount = slides.length;

  let current = 0;

  // ✅ 도트 생성
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('span');

  // ✅ 중심 offset 계산
  function getOffset(index) {
    const slideWidth = slides[index].getBoundingClientRect().width;
    const slideLeft = slides[index].offsetLeft;
    const wrapperCenter = wrapper.clientWidth / 2;
    return slideLeft + slideWidth / 2 - wrapperCenter;
  }

  // ✅ 이동
  function moveToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    const offset = getOffset(index);
    slide.style.transition = 'transform 0.5s ease';
    slide.style.transform = `translateX(${-offset}px)`;

    current = index;
  }

  // ✅ Next / Prev
  function nextSlide() {
    if (current < slideCount - 1) {
      moveToSlide(current + 1);
    } else {
      // 마지막이면 처음으로 부드럽게 순간 이동
      moveToSlide(0);
    }
  }

  function prevSlide() {
    if (current > 0) {
      moveToSlide(current - 1);
    } else {
      // 첫번째에서 마지막으로 부드럽게 순간 이동
      moveToSlide(slideCount - 1);
    }
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // ✅ 자동 슬라이드
  let auto = setInterval(nextSlide, 3000);
  [nextBtn, prevBtn, ...dots].forEach(el => {
    el.addEventListener('click', () => {
      clearInterval(auto);
      auto = setInterval(nextSlide, 3000);
    });
  });

  // ✅ 리사이즈 대응
  window.addEventListener('resize', () => {
    slide.style.transition = 'none';
    slide.style.transform = `translateX(${-getOffset(current)}px)`;
  });

  // ✅ 초기 시작
  moveToSlide(current);


});  //js 끝~~~~~~~~~~~~~~~~~~~~
