import "./Swipeable.scss"
import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Autoplay} from "swiper/modules"

function Swipeable({ children, breakpoints, className = "", slidesPerView = 3, spaceBetween = 20, loop = false, autoPlayDelay = 10000 }) {
    return (
        <Swiper className={`swipeable ${className}`}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                grabCursor={true}
                preventClicksPropagation={true}
                loop={loop}
                breakpoints={breakpoints}
                autoplay={{
                    delay: autoPlayDelay,
                    disableOnInteraction: false
                }}>
            {children.map((child, key) => (
                <SwiperSlide className={`swipeable-swiper-slide`} key={key}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Swipeable