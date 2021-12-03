import React from 'react'
import '../../App.css'
import './Home.css'
import Card from '../Card'
import HeroSection from '../HeroSection'
import MainCarousel from '../MainCarousel'

function Home () {
    return (
        <>
        <div className="home">
            <div className="homeContainer">
                {/* <HeroSection/> */}
                <MainCarousel/>
                <div className="panelContainer">
                    <div className="panel">
                        <Card 
                        title='About Blood' 
                        imageUrl={`${process.env.PUBLIC_URL}/images/blood-donor-card-4.png`} 
                        body='The ABO blood group system was discovered by Karl Landsteiner in 1900. 46 years later (1946) the Blood Transfusion Service was formed. In 1996 the National Blood Service was formed to collect and provide blood supplies for all the hospitals in Sri Lanka.'
                        />
                    </div>
                    <div className="panel">
                        <Card 
                        title='Components of Blood' 
                        imageUrl={`${process.env.PUBLIC_URL}/images/blood-donor-card-2.jpg`} 
                        body='When we receive your donation we separate it into individual components by spinning it in a machine called a centrifuge. The individual components are red cells, white cells, platelets and plasma. These can all be put to different uses.'
                        />
                    </div>
                    <div className="panel">
                        <Card 
                        title='How does the Body Replace Blood' 
                        imageUrl={`${process.env.PUBLIC_URL}/images/blood-donor-card-3.jpg`} 
                        body='During a whole blood donation we aim to take just under a pint (about 470mls) of blood, which works out at no more than 13 per cent of your blood volume. After donation, your body has an amazing capacity to replace all the cells and fluids that have been lost.'
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;