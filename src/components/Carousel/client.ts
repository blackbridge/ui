import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


function carouselInit(el) {

    const options = JSON.parse(el.dataset.options)

    console.log(options)

    // Navigation
    // ?? Is there a better way to do this, where you store the child items in a next / prev object?
    const navNext = el.querySelector('.ui-carousel__navigation--prev')
    const navPrev = el.querySelector('.ui-carousel__navigation--next')
    
    new Swiper(el, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        grabCursor: true,
        navigation: {
            nextEl: navNext,
            prevEl: navPrev,
        },
        ...options
    })
}


[...document.querySelectorAll('.ui-carousel')].map(carouselInit)
