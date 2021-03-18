// == Import npm
import React, { useState } from 'react';
import axiosInstance from 'src/api';

// == Import Components
import Search from 'src/components/Search';
import Repos from 'src/components/Repos';

// == Import assets
import githubLogo from '../../assets/images/logo-github.png';
import './styles.scss';

// == Mock API
// import reposDataJson from 'src/data/repos';

// == Composant
const Github = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [repos, setRepos] = useState([]);
  const [results, setResults] = useState(0);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false); // Loading repos status state
  const [loadingSeeMore, setLoadingSeeMore] = useState(false); // Loading button status state
  const [nextPage, setNextPage] = useState(2); // page of github api result to get

  const handleSearch = () => {
    setLoading(true);
    axiosInstance.get(`repositories?q=${inputSearch}&sort=stars&order=desc&page=1&per_page=9`)
      .then((response) => response.data)
      .then((data) => {
        setRepos(data.items);
        setResults(data.total_count);
        setInit(false);
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInputSearch(input);
  };

  const handleSeeMore = () => {
    setLoadingSeeMore(true);
    axiosInstance.get(`repositories?q=${inputSearch}&sort=stars&order=desc&page=${nextPage}&per_page=9`)
      .then((response) => response.data)
      .then((data) => {
        const newData = [...repos, ...data.items];
        setNextPage(nextPage + 1);
        setRepos(newData);
        setResults(data.total_count);
        setLoadingSeeMore(false);
      })
      .catch(console.error);
  };

  return (
    <div className="github">
      <div className="github__logo-wrapper">
        <img src={githubLogo} alt="gitHub logo" />
      </div>
      <Search
        onInputChange={handleInputChange}
        onSearchSubmit={handleSearch}
        inputLabel={inputSearch}
      />
      <Repos
        loading={loading}
        init={init}
        repos={repos}
        results={results}
        onClickSeeMore={handleSeeMore}
        loadingSeeMore={loadingSeeMore}
      />
    </div>
  );
};
// == Export
export default Github;
