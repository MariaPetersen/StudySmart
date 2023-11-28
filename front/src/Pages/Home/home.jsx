import React from 'react';
import { UserContext } from '../../Context/Usercontext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../../Components/card/card';
import './home.css';

export default function Home() {
  const { value } = useContext(UserContext);
  const [dataPublications, setDataPublications] = useState(null);

  console.log(value);
  useEffect(() => {
    const response = async () => {
      return await await fetch(
        'https://studysmart-production.up.railway.app/publications'
      )
        .then((data) => data.json())
        .then((publications) => {
          setDataPublications(publications);
          console.log(publications);
        })
        .catch((error) => console.log(error));
    };
    response();
  }, []);

  return (
    <div id="home">
      <div className="title_container">
        <div className="title_box one">the</div>
        <div className="title_box two">new</div>
        <div className="title_box three">feed</div>
      </div>
      <div className="publications_container">
        {dataPublications?.map((publications) => (
          <Card key={publications.id} data={publications} />
        ))}
      </div>
    </div>
  );
}
