import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


function carouselInit(el) {

    const options = JSON.parse(el.dataset.options)

    const navNext = el.querySelector('.ui-carousel__navigation--prev')
    const navPrev = el.querySelector('.ui-carousel__navigation--next')
    const pagination = el.querySelector('.ui-carousel__pagination')
    
    new Swiper(el, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        grabCursor: true,
        navigation: {
            nextEl: navNext,
            prevEl: navPrev,
        },
        pagination: {
            el: pagination,
            bulletClass: 'ui-carousel__pagination__item',
            bulletActiveClass: 'active',
            clickable: true,
        },
        ...options
    })
}


[...document.querySelectorAll('.ui-carousel')].map(carouselInit)
