import React from 'react'
import './HeroSection.css'

function HeroSection() {
    return (
        <div className='hero-container'>
            <img className='img-section' src={`${process.env.PUBLIC_URL}/images/banner-1.jpg`}></img>
        </div>
    )
}

export default HeroSection
