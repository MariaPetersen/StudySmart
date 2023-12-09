import React from 'react';
import { UserContext } from '../../Context/Usercontext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../../Components/card/card';
import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const { value } = useContext(UserContext);
  const [dataPublications, setDataPublications] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [titlepublication, setTitlePublications] = useState('');
  const [descriptionpublication, setDescriptionPublications] = useState('');
  const [textpublication, setTextPublications] = useState('');
  const [urlpublication, setUrlPublications] = useState('');
  // const [descriptionpublication, setdescriptionPublications] = useState(null);

  useEffect(() => {
    const response = async () => {
      return await fetch(
        'https://studysmart-production.up.railway.app/publications'
      )
        .then((data) => data.json())
        .then((publications) => {
          setDataPublications(publications);
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
        <div className="title_box two">new</div>
        <div className="title_box three">feed</div>
      </div>
      {value.currentUser ? (
        <div className="form_container">
          <div
            className="add_pubications"
            onClick={() => (formOpen ? setFormOpen(false) : setFormOpen(true))}
          >
            Ajouter Publications
            {!formOpen ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
          </div>
          {!formOpen ? null : (
            <form onSubmit={submitPublication}>
              <div className="input_container">
                <label htmlFor="title">Title</label>

                <input
                  className="title_publication_input"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={titlepublication}
                  onChange={(e) => setTitlePublications(e.target.value)}
                  required
                />
              </div>
              <div className="input_container">
                <label htmlFor="text">Description</label>

                <input
                  className="title_publication_input"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={descriptionpublication}
                  onChange={(e) => setDescriptionPublications(e.target.value)}
                  required
                />
              </div>
              <div className="input_container">
                <label htmlFor="text">Text</label>

                <input
                  className="title_publication_input"
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Text"
                  value={textpublication}
                  onChange={(e) => setTextPublications(e.target.value)}
                  required
                />
              </div>

              <div className="input_container">
                <label htmlFor="title">URL</label>

                <input
                  className="title_publication_input"
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Url"
                  value={urlpublication}
                  onChange={(e) => setUrlPublications(e.target.value)}
                  required
                />
              </div>
              <input
                className="login_button_form_home"
                value="ENTER"
                type="submit"
              />
            </form>
          )}
        </div>
      ) : null}
      <div className="publications_container">
        {Array.isArray(dataPublications) && dataPublications.length > 0 ? (
          dataPublications
            .sort((a, b) => b.id - a.id)
            .map((publication) => (
              <Link
                to={`publication/${publication.id}`}
                className="publication_container"
              >
                <Card key={publication.id} data={publication} />
              </Link>
            ))
        ) : (
          <div>Aucune publication disponible.</div>
        )}
      </div>
    </div>
  );
}
