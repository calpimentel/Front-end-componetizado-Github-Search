// Este e o provider de content
import React, { createContext, useCallback, useState } from "react";
import api from "../services/api";

// Criando o Context para o componente CithubContext
export const GithubContext = createContext({
  loading: false,
  user: {},
  repositories: [],
  starred: [],
});

// Objeto principal da aplicação
const GithubProvider = ({ children }) => {
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user: {
      id: undefined,
      avatar: undefined,
      login: undefined,
      name: undefined,
      html_url: undefined,
      blog: undefined,
      company: undefined,
      location: undefined,
      followers: 0,
      following: 0,
      public_gists: 0,
      public_repos: 0,
    },
    repositories: [],   // Lista de repositorios do proprio usuario
    starred: [],        // este array vai renderizar a lista de componentes que foi dado pelo usuario
  });

  // Pegar os dados do usuario do GitHub
  // Acionada com o botão buscar do projeto
  const getUser = (username) => {
    setGithubState((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }));
    // Buscando todos os dados pelo username e passando para o estado do provider
    // Todos os locais que usam o provider vão ter estes dados atualizados
    api
      .get(`users/${username}`)
      .then(({ data }) => {
        setGithubState((prevState) => ({
          ...prevState,
          hasUser: true,
          user: {
            id: data.id,
            avatar: data.avatar_url,
            login: data.login,
            name: data.name,
            html_url: data.html_url,
            blog: data.blog,
            company: data.company,
            location: data.location,
            followers: data.followers,
            following: data.following,
            public_gists: data.public_gists,
            public_repos: data.public_repos,
          },
        }));
      })
      .finally(() => {
        setGithubState((prevState) => ({
          ...prevState,
          loading: !prevState.loading,
        }));
      });
  };

  // Pegando a lista de Repos
  const getUserRepos = (username) => {
    api.get(`users/${username}/repos`).then(({ data }) => {
      console.log("data: " + JSON.stringify(data));
      setGithubState((prevState) => ({
        ...prevState,
        repositories: data,
      }));
    });
  };

  // Preferencias do usuario
  const getUserStarred = (username) => {
    api.get(`users/${username}/starred`).then(({ data }) => {
      console.log("data: " + JSON.stringify(data));
      setGithubState((prevState) => ({
        ...prevState,
        starred: data,
      }));
    });
  };

  // Retornado o valor do provider o proprio context
  const contextValue = {
    // O estado do usuarios e as   funçõs de captura de dados
    githubState,
    getUser: useCallback((username) => getUser(username), []),
    getUserRepos: useCallback((username) => getUserRepos(username), []),
    getUserStarred: useCallback((username) => getUserStarred(username), []),
  };

  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
