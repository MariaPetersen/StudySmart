import React from "react";
import "./Footer.css";
export default function footer() {
  return (
    <footer>
      <div className="footer_section_one">
        <div className="section_one_left">
          <div className="section_one_left_text">
            <p>DON'T MISS</p>
            <p>NEW UPDATES</p>
          </div>
          <div className="section_one_left_register">
            <input
              placeholder="ENTER YOUR EMAIL"
              className="section_one_resgister_input"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <button className="section_one_resgister_button">SUBMIT</button>
          </div>
        </div>
        <div className="section_one_right">
          <div className="section_findus">
            <span>YOU CAN FIND US</span>
            <ul>
              <li>
                <a
                  className="section_findus_email"
                  href="mailto:studysmart@gmail.com">
                  studysmart@gmail.com
                </a>
              </li>
              <li>01 43 49 37 80</li>
              <li>32 Rue de la Perche, 16e Arr</li>
            </ul>
          </div>
          <div className="section_help">
            <span>HELP</span>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_section_two">
        When you use our services, you’re trusting us with your information. We
        understandthis is a big responsability and work hard to protect your
        information and put you in control.
      </div>
    </footer>
  );
}
