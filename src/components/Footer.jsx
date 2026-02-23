import React from "react";
import logo from "/assets/images/logo.png";
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footeer_logo">
              <img src={logo} alt="NLX Motors logo" />
            </div>
          </div>
        </div>

        <div className="footer_section_2">
          <div className="row">
            <div className="col">
              <h4 className="footer_taital">{t('subscribeNow')}</h4>
              <p className="footer_text">
                {t('subscribeText')}
              </p>
              <div className="form-group">
                <textarea
                  className="update_mail"
                  placeholder={t('enterYourEmail')}
                  rows="5"
                  id="comment"
                  name="Enter Your Email"
                ></textarea>
                <div className="subscribe_bt">
                  <a href="#">{t('subscribe')}</a>
                </div>
              </div>
            </div>

            <div className="col">
              <h4 className="footer_taital">{t('information')}</h4>
              <p className="lorem_text">
                {t('informationText')}
              </p>
            </div>

            <div className="col">
              <h4 className="footer_taital" style={{ color: "#ffffff" }}>
                {t('helpfulLinks')}
              </h4>
              <p className="lorem_text" style={{ color: "#ffffff", marginBottom: "10px" }}>
                BMW Cars:{" "}
                <a
                  href="https://www.bmw.com/en/buy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffffff", textDecoration: "underline" }}
                >
                  https://www.bmw.com/en/buy.html
                </a>
              </p>
              <p className="lorem_text" style={{ color: "#ffffff", marginBottom: "10px" }}>
                Mercedes-Benz Cars:{" "}
                <a
                  href="https://www.mercedes-benz.com/en/vehicles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffffff", textDecoration: "underline" }}
                >
                  https://www.mercedes-benz.com/en/vehicles/
                </a>
              </p>
            </div>

            <div className="col">
              <h4 className="footer_taital">{t('investments')}</h4>
              <p className="lorem_text">
                {t('investmentsText')}
              </p>
            </div>

            <div className="col">
              <h4 className="footer_taital">{t('contact')}</h4>
              <div className="location_text">
                <a href="#">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span className="padding_left_15">{t('location')}</span>
                </a>
              </div>
              <div className="location_text">
                <a href="#">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span className="padding_left_15">(+71) 8522369417</span>
                </a>
              </div>
              <div className="location_text">
                <a href="#">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span className="padding_left_15">demo@gmail.com</span>
                </a>
              </div>
              <div className="social_icon">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
