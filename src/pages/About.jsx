import React from 'react'
import Hero from '../components/Hero'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage();
  
  const html = `
      <!-- about section start -->
      <div class="about_section layout_padding">
         <div class="container">
            <div class="about_section_2">
               <div class="row">
                  <div class="col-md-6"> 
                     <div class="image_iman"><img src="/assets/images/about-img.png" class="about_img"></div>
                  </div>
                  <div class="col-md-6"> 
                     <div class="about_taital_box">
                        <h1 class="about_taital">${t('about')} <span style="color: #fe5b29;">${t('aboutUs').split(' ')[1] || 'Us'}</span></h1>
                        <p class="about_text">${t('aboutText')}</p>
                        <div class="readmore_btn"><a href="#">${t('readMore')}</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- about section end -->
      
    

   `

  return (
    <div>
      <Hero subtitle="">
        {/* original top content preserved */}
      </Hero>
      <div className="container" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )
}
