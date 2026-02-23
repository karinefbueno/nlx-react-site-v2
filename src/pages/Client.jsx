import React, { useState } from 'react'
import Hero from '../components/Hero'
import { useLanguage } from '../i18n/LanguageContext'

export default function Client() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0)
  
  const testimonials = [
    [
      {
        image: '/assets/images/client-img5.png',
        name: 'Daniel',
        text: 'Find that ride that speaks to your soul and let it take you where you wanna be.'
      },
      {
        image: '/assets/images/client-img6.png',
        name: 'Sophia',
        text: 'Get the car that totally matches your vibe and takes you everywhere in style!'
      }
    ],
    [
      {
        image: '/assets/images/client-img1.png',
        name: 'Hannery',
        text: 'Find the car that moves your heart and sets your spirit free.'
      },
      {
        image: '/assets/images/client-img2.png',
        name: 'Channery',
        text: 'Drive your dreams, embrace the road, and let every journey tell your story.'
      }
    ],
    [
      {
        image: '/assets/images/client-img3.png',
        name: 'Chloe',
        text: 'Best service of my life!'
      },
      {
        image: '/assets/images/client-img4.png',
        name: 'John',
        text: 'Easy like used to be.'
      }
    ]
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div>
      <Hero title="" subtitle="" />
      
      <div className="client_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="client_taital">{t('whatSaysCustomers')}</h1>
            </div>
          </div>
          
          <div className="client_section_2">
            <div className="row">
              {testimonials[activeSlide].map((testimonial, index) => (
                <div key={index} className="col-md-6">
                  <div className="client_taital_box">
                    <div className="client_img">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <h3 className="moark_text">{testimonial.name}</h3>
                    <p className="client_text">{testimonial.text}</p>
                  </div>
                  <div className="quick_icon">
                    <img src="/assets/images/quick-icon.png" alt="Quote" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="carousel-controls d-flex justify-content-center mt-4">
            <button 
              className="btn btn-link carousel-control-prev" 
              onClick={prevSlide}
              style={{ color: '#000', fontSize: '24px', textDecoration: 'none' }}
            >
              ‹
            </button>
            <button 
              className="btn btn-link carousel-control-next" 
              onClick={nextSlide}
              style={{ color: '#000', fontSize: '24px', textDecoration: 'none', marginLeft: '20px' }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
