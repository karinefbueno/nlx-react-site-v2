import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { useLanguage } from '../i18n/LanguageContext'

export default function Gallery() {
  const { t } = useLanguage();
  
  const html = `
      <!-- gallery section start -->
      <div class="gallery_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <h1 class="gallery_taital">${t('ourBestOffers')}</h1>
               </div>
            </div>
            <div class="gallery_section_2">
               <div class="row">
                  <div class="col-md-4">
                     <div class="gallery_box">
                        <div class="gallery_img"><img src="/assets/images/img-1.png"></div>
                        <h3 class="types_text">Mercedes-Benz M-Class (SUV)</h3>
                          <p class="looking_text">${t('startPerDay')} $9000</p>
                        <div class="read_bt"><a href="#">${t('bookNow')}</a></div>
                     </div>
                  </div>
                  <div class="col-md-4">
                     <div class="gallery_box">
                        <div class="gallery_img"><img src="/assets/images/img-2.png"></div>
                        <h3 class="types_text">Mercedes-Benz Classe S</h3>
                          <p class="looking_text">${t('startPerDay')} $8000</p>
                        <div class="read_bt"><a href="#">${t('bookNow')}</a></div>
                     </div>
                  </div>
                  <div class="col-md-4">
                     <div class="gallery_box">
                        <div class="gallery_img"><img src="/assets/images/img-3.png"></div>
                        <h3 class="types_text">BMW M340i xDrive</h3>
                          <p class="looking_text">${t('startPerDay')} $70000</p>
                        <div class="read_bt"><a href="#">${t('bookNow')}</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- gallery section end -->

   `

  return (
    <div>
      <Hero title="" subtitle="">
        {/* original top content preserved */}
      </Hero>
      <div className="container" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )
}
