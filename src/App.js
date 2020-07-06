import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepository(response.data);
        //console.log(response);
    })
},[]);  


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      
      title: "Novo Repo ReactJS",
      url: "https://github.com/pyrobit/challenge-concepts-react.git",
      techs: ["React", "Node.js"]
      
    });

    const repo = response.data;
    setRepository( [...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepository(repositories.filter(repo => repo.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repo => (<li key={repo.id}>
          {repo.title} 
          <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>)
          )}
  
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar
        </button>
    </div>
  );
}

export default App;
