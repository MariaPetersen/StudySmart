import React from 'react';
import './card.css';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Card({ data }) {
  const [linkreview, setLinkreview] = useState([]);
  function convertirDate(dateISO) {
    let date = new Date(dateISO);
    let jour = date.getDate().toString().padStart(2, '0');
    let mois = (date.getMonth() + 1).toString().padStart(2, '0');
    let annee = date.getFullYear();
    return `${jour}-${mois}-${annee}`;
  }
  // const url = `https://link-preview4.p.rapidapi.com/?url=${data.link}&oembed=false`;

  useEffect(() => {
    const url =
      'https://link-preview4.p.rapidapi.com/?url=https%3A%2F%2Fmui.com%2Fmaterial-ui%2Freact-app-bar%2F&oembed=false';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ac2b0692c4msh9f9e2aec4d08a25p1e41d7jsn91be42e498ea',
        'X-RapidAPI-Host': 'link-preview4.p.rapidapi.com',
      },
    };
    const responsepreview = async () => {
      return await fetch(url, options)
        .then((data) => data.json())
        .then((response) => {
          console.log(response);
          setLinkreview(response);
        })
        .catch((error) => console.log(error));
    };

    responsepreview();
  }, []);

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
        <span>{data.profile.user.username}</span>
        <span>{convertirDate(data.date)}</span>
      </div>
      <div className="second_box_card">{data.title}</div>

      {isValidUrl(data.link) && data.link.includes('youtube') ? (
        <iframe
          title="link_preview"
          width="100%"
          height="100%"
          src={`${data.link}`}
        ></iframe>
      ) : linkreview && linkreview.ogp && linkreview.ogp['og:image'] ? (
        <img
          className="imgcover"
          alt={data.title}
          onClick={() => window.open(`${data.link}`)}
          src={`${linkreview.ogp['og:image'][0]}`}
        />
      ) : null}
    </div>
  );
}
