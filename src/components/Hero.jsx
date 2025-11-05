import React from 'react'

export default function Hero({title, subtitle, children}) {
  return (
    <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1>{title}</h1>
            {subtitle && <p className="lead">{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
