import React from 'react';
import './publication.css';
export default function publication() {
  return (
    <div id="content">
      <div className="publication">
        <div className="return">
          <p>RETURN</p>
        </div>
        <div className="publication-all">
          <div className="publication-left">
            <div className="publication-left-top">
              <img src="./Williams2.png" alt="publication_picture" />
              <h1>Lucas</h1>
            </div>
            <div className="line"></div>
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                explicabo temporibus commodi totam nihil corrupti veritatis qui.
                Aut modi perspiciatis illo, eos itaque quo suscipit inventore.
                Porro obcaecati ab dignissimos!
              </p>
            </div>
            <div className="line"></div>
            <div className="information">
              <div className="date">
                <span>Date</span>
                <p>10 AUGUST 2023</p>
              </div>
              <div className="email">
                <span>Email</span>
                <p>YALMANLUCAS@GMAIL.COM</p>
              </div>
            </div>
          </div>
          <div className="publication-right">
            <div className="content">
              <img src="./Williams2.png" alt="publication_picture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
