import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  const [ num, setNum ] = useState(1);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "Repositório "+num, 
      url: "url.test.com.br",
      techs: [
        "tech1",
        "tech2"
      ]
    });
    const repository = response.data;

    setNum(num + 1);
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/'+id);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
