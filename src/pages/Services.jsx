import React from 'react'
import Hero from '../components/Hero'

export default function Services() {
  const services = [
    {
      icon: '/assets/images/icon-1.png',
      title: 'SAFETY & SECURITY',
      description: 'Ensuring your peace of mind with vehicles designed to protect you every step of the way'
    },
    {
      icon: '/assets/images/icon-2.png',
      title: 'Online Booking',
      description: 'Book your preferred car easily and securely, enjoying a smooth and simple experience'
    },
    {
      icon: '/assets/images/icon-3.png',
      title: 'Best Drivers',
      description: 'Our careful drivers handle every car with attention and deliver it safely to you'
    }
  ]

  return (
    <div className="choose_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="choose_taital">WHY CHOOSE US</h1>
          </div>
        </div>
        <div className="choose_section_2">
          <div className="row">
            {services.map((service, index) => (
              <div key={index} className="col-sm-4">
                <div className="icon_1">
                  <img src={service.icon} alt={service.title} />
                </div>
                <h4 className="safety_text">{service.title}</h4>
                <p className="ipsum_text">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
