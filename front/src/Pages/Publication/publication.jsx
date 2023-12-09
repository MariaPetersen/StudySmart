import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context/Usercontext';
import './publication.css';

export default function Publication() {
  const { id } = useParams();
  const { value } = useContext(UserContext);
  const [publication, setPublication] = useState();

  const fetchPublication = useCallback(async () => {
    try {
      const response = await fetch(
        `https://studysmart-production.up.railway.app/publications/${id}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const publicationData = await response.json();
        setPublication(publicationData);
      } else {
        console.error('Failed to fetch publication');
      }
    } catch (error) {
      console.error('Error fetching publication:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPublication();
  }, [fetchPublication]);

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
              <h1>{publication.title}</h1>
            </div>
            <div className="line"></div>
            <div className="description">
              <p>{publication.description}</p>
            </div>
            <div className="line"></div>
            <div className="information">
              {/* <div className="date">
                <span>Date</span>
                <p>10 AUGUST 2023</p>
              </div> */}
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
