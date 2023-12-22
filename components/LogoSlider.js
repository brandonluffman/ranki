import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LogoSlider = () => {
    const [settings] = useState({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 11,
      autoplay: true,
      speed: 50000,
      autoplaySpeed: 0,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024, // For devices with width less than 1024px
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600, // For devices with width less than 600px
          settings: {
            slidesToShow: 2,
            slidesToScroll: 5,
          }
        },
        {
          breakpoint: 480, // For devices with width less than 480px
          settings: {
            slidesToShow: 2,
            slidesToScroll: 5,
          }
        }
      ]
    });

    const logos = [
        '/amazon.png',
        '/apple.png',
        '/JaneStreet.png',
        '/netflix.webp',
        '/google.png',
        '/meta.png',
        '/openai.png',
        '/citadel.png',
        '/2sigma.png',
        '/microsoft.png',
        '/uber.png',

        // Add more logos here
      ];
    // Your component logic
    return (
        <div className='logo-slider-div'>
          <img src='/chatbot.png' className='logo-slider-header-img'></img>
        <h2 className='logo-slider-header'>Join the businesses already taking advantage of AI Content Generation.</h2>
        <Slider {...settings} className='logo-slider-outer'>
          {logos.map((logo, index) => (
            <div key={index} className="container logo-slider-container">
              <img src={logo} alt='logo' className='logo-slider-img'/>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  export default LogoSlider;
  