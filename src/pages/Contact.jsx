import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage();
  
  const html = `
      <!-- contact section start -->
      <div class="contact_section layout_padding">
         <div class="container">
            <div class="row">
               <div class="col-sm-12">
                  <h1 class="contact_taital">${t('getInTouch')}</h1>
               </div>
            </div>
         </div>
         <div class="container">
            <div class="contact_section_2">
               <div class="row">
                  <div class="col-md-12">
                     <div class="mail_section_1">
                        <input type="text" class="mail_text" placeholder="${t('name')}" name="Name">
                        <input type="text" class="mail_text" placeholder="${t('email')}" name="Email">
                        <input type="text" class="mail_text" placeholder="${t('phoneNumber')}" name="Phone Number">
                        <textarea class="massage-bt" placeholder="${t('message')}" rows="5" id="comment" name="Massage"></textarea>
                        <div class="send_bt"><a href="#">${t('send')}</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- contact section end -->
      <!-- copyright section start -->

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
