import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Importação dos scripts necessários ao carregar a página
    const scripts = [
      "/js/jquery.min.js",
      "/js/popper.min.js",
      "/js/bootstrap.bundle.min.js",
      "/js/jquery-3.0.0.min.js",
      "/js/plugin.js",
      "/js/jquery.mCustomScrollbar.concat.min.js",
      "/js/custom.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) document.body.removeChild(script);
      });
    };
  }, []);

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
                        Car Rent <br />
                        <span style={{ color: "#fe5b29" }}>For You</span>
                      </h1>
                      <p className="banner_text">
                        Find your ideal car from a wide selection of models and enjoy the ride every single day
                      </p>
                      <div className="btn_main">
                        <div className="contact_bt"><a href="#">Read More</a></div>
                        <div className="contact_bt active"><a href="#">Contact Us</a></div>
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
              <div className="banner_img"><img src="/images/banner-img.png" alt="banner" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
