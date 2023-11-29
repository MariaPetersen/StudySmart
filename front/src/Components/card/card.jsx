import React from 'react';
import './card.css';
export default function Card({ data }) {
  function convertirDate(dateISO) {
    let date = new Date(dateISO);
    let jour = date.getDate().toString().padStart(2, '0');
    let mois = (date.getMonth() + 1).toString().padStart(2, '0');
    let annee = date.getFullYear();
    return `${jour}-${mois}-${annee}`;
  }

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  return (
    <div className="card">
      <div className="first_box_card">
        <span>{data.profile.user.username}</span>{' '}
        <span>{convertirDate(data.date)}</span>
      </div>
      <div className="second_box_card">{data.title}</div>

      {isValidUrl(data.link) && data.link.includes('youtube') ? (
        <iframe width="100%" height="100%" src={`${data.link}`}></iframe>
      ) : null}
    </div>
  );
}
