import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export class MainCarousel extends Component {
    render() {
        return (
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval={5000} showThumbs={false} stopOnHover={true}>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-1.jpg`} />
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-2.jpg`} />
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-3.jpg`} />
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-4.jpg`} />
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-5.jpg`} />
                </div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/banner-6.jpg`} />
                </div>
            </Carousel>
        )
    }
}

export default MainCarousel
