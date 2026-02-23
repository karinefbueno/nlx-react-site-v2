import React from "react";
import { useLanguage } from '../i18n/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Banner Section */}
      <div className="banner_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="banner_slider" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">
                        {t('carRentForYou')} <br />
                        <span style={{ color: "#fe5b29" }}>{t('forYou')}</span>
                      </h1>
                      <p className="banner_text">
                        {t('findIdealCar')}
                      </p>
                      <div className="btn_main">
                        <div className="contact_bt"><a href="#">{t('readMore')}</a></div>
                        <div className="contact_bt active"><a href="#">{t('contactUs')}</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#banner_slider" role="button" data-slide="prev">
                  <i className="fa fa-angle-left"></i>
                </a>
                <a className="carousel-control-next" href="#banner_slider" role="button" data-slide="next">
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner_img"><img src="/assets/images/logo.png" alt="Trator" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
