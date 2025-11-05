import React from 'react'
import Hero from '../components/Hero'

export default function About() {
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
                        <h1 class="about_taital">About <span style="color: #fe5b29;">Us</span></h1>
                        <p class="about_text">We believe that every journey begins with trust, and every road tells a story worth remembering. Our mission is to provide a seamless car buying experience where design, performance, and reliability meet. Each model in our collection is carefully chosen to match your lifestyle and ambitions. Whether you seek innovation, comfort, or adventure, we make sure your next drive is unforgettable. </p>
                        <div class="readmore_btn"><a href="#">Read More</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- about section end -->
      
    
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-3.0.0.min.js"></script>
      <script src="js/plugin.js"></script>
      <!-- sidebar -->
      <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="js/custom.js"></script>
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
