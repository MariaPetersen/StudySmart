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

  const submitPublication = async (event) => {
    event.preventDefault();
    console.log(value);
    try {
      const responsePublication = await fetch(
        'https://studysmart-production.up.railway.app/publications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value.currentUser?.token.token}`,
          },
          body: JSON.stringify({
            title: titlepublication,
            description: descriptionpublication,
            text: textpublication,
            link: urlpublication,
          }),
        }
      );

      if (responsePublication.ok) {
        console.log(responsePublication);
        document.getElementById('text').value = '';
        document.getElementById('description').value = '';
        document.getElementById('url').value = '';
        document.getElementById('title').value = '';
        window.location.reload();
        // Gérer la réponse en cas de succès (par exemple, redirection ou affichage d'un message)
      } else {
        // Gérer les erreurs de réponse
        console.log(responsePublication);
      }
    } catch (error) {
      console.log(error);
      // Gérer les erreurs de réseau ou autres exceptions
    }
  };

  return (
    <div id="home">
      <div className="title_container">
        <div className="title_box one">the</div>
        <div className="title_box two">news</div>
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
  