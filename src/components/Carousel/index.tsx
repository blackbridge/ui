import classnames from 'classnames'
import '../../styles/grid.less'
import './client.ts?client'
import 'swiper/css';
import './style.less'

import type { JSX, ComponentChildren } from "preact"

type CarouselGroupProps = {
    class?: HTMLElement['className'],
    speed: number, 
    center?: boolean,
    loop?: boolean,
    autoplay?: boolean,
    navigation?: boolean,
    pagination?: boolean,
    children?: ComponentChildren,
    align?: 'start'|'center'|'end'
}

export function CarouselGroup(props : CarouselGroupProps): JSX.Element {
    
    const {
        class: className,
        speed = 800,
        center = false,
        loop = false,
        autoplay = false,
        navigation = false,
        pagination = false,
        align,
        children
    } = props

    const classes = classnames(
        'ui-carousel',
        center && `ui-carousel--center`,
        !loop && `ui-carousel--no-loop`,
        className
    )

    const wrapperClasses = classnames(
        'swiper-wrapper',
		align && `flex-align-${align}`,
    )

    const json = JSON.stringify({ speed, centeredSlides : center, loop, autoplay })
    
    return <>
        <div class={classes} data-options={json}>
            <div class={wrapperClasses}>
                {children}
            </div>

            {pagination &&
                <div class="ui-carousel__pagination"></div>
            }
            
            {navigation && 
                <div class="ui-carousel__navigation">
                    <button class="ui-carousel__navigation__button ui-carousel__navigation--next"></button>
                    <button class="ui-carousel__navigation__button ui-carousel__navigation--prev"></button>
                </div>
            }
        </div>
    </>
}

type CarouselItemProps = {
    children?: ComponentChildren
}

export function CarouselItem(props : CarouselItemProps): JSX.Element {

    const {
        children
    } = props

    return <>
        <div class="ui-carousel__item swiper-slide">
            <div className="ui-carousel__item__inner">
                {children}
            </div>
        </div>
    </>
}