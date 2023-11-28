import React from 'react';
import './card.css';
export default function Card({ data }) {
  console.log(data.date);
  function convertirDate(dateISO) {
    let date = new Date(dateISO);
    let jour = date.getDate().toString().padStart(2, '0');
    let mois = (date.getMonth() + 1).toString().padStart(2, '0');
    let annee = date.getFullYear();
    return `${jour}-${mois}-${annee}`;
  }

  let dateTransformee = convertirDate('2023-11-08T00:00:00.000Z');
  console.log(dateTransformee);
  return (
    <div className="card">
      <div className="first_box_card">
        <span></span> <span>{convertirDate(data.date)}</span>
      </div>
      <div className="second_box_card">{data.text}</div>
      <div></div>
    </div>
  );
}
