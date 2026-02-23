import React from 'react'
import Hero from '../components/Hero'
import { useLanguage } from '../i18n/LanguageContext'

export default function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: '/assets/images/icon-1.png',
      title: t('safetyTitle'),
      description: t('safetyDesc')
    },
    {
      icon: '/assets/images/icon-2.png',
      title: t('onlineBookingTitle'),
      description: t('onlineBookingDesc')
    },
    {
      icon: '/assets/images/icon-3.png',
      title: t('bestDriversTitle'),
      description: t('bestDriversDesc')
    }
  ]

  return (
    <div className="choose_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="choose_taital">{t('whyChooseUs')}</h1>
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
