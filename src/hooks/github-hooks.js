// Componente Hook do GitHib
// ------------------------------------------------------------------------------------
import { useContext } from "react";
import { GithubContext } from "../providers/github-provider";

const useGithub = () => {
  // Consumindo o content para o componente provider
  const { githubState, getUser, getUserRepos, getUserStarred } = useContext(
    GithubContext
  );

  return { githubState, getUser, getUserRepos, getUserStarred };
};

export default useGithub;
