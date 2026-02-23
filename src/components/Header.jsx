import { Link } from "react-router-dom";
import logo from "/assets/images/logo.png";
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

export default function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Trator logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">{t('home')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">{t('about')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">{t('services')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">{t('vehicles')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/client">{t('client')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">{t('contact')}</Link>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

    </header>
  );
}
