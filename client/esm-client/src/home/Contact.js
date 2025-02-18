import React from "react";

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card">
          <h2 className="h2 section-title">Get in touch <br /> We're here to assist you</h2>
          <div className="wrapper">
            <form action="" method="POST" id="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="contact-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="contact-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                required
                className="contact-input"
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                className="contact-input"
              ></textarea>
              <button type="submit" className="btn-submit">
                Submit Message
              </button>
            </form>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
