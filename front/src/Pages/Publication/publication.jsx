import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './publication.css';

export default function Publication() {
  const { id } = useParams();
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  useEffect(() => {
    fetchPublication();
  }, [fetchPublication]);

  return (
    <div id="content">
      {console.log(publication)}
      <div className="publication">
        <div className="return">
          <Link to="/" className="link">
            RETURN
          </Link>
        </div>
        <div className="publication-all">
          <div className="publication-left">
            <div className="publication-left-top">
              <h1>{publication?.title}</h1>
            </div>
            <div className="line"></div>
            <div className="description">
              <p>{publication?.description}</p>
            </div>
            <div className="description">
              <Link className="description link" href={`${publication?.link}`}>
                {publication?.link}
              </Link>
            </div>
            <div className="description">
              <p>{publication?.text}</p>
            </div>
            <div className="line"></div>
            <div className="information">
              <div className="date">
                <span>Date</span>
                <p>{formatDate(publication?.date)}</p>
              </div>
              <div className="email">
                <span>Username</span>
                <p>{publication?.user.username}</p>
              </div>
            </div>
          </div>
          <div className="publication-right"></div>
        </div>
      </div>
    </div>
  );
}
