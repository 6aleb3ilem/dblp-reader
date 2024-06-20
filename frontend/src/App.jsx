import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [publis, setPublis] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    fetchData();
  }, [currentPage, search, pageSize]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/publis', {
        params: {
          page: currentPage,
          limit: pageSize,
          search,
        },
      });
      setPublis(response.data.publis);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const halfMax = Math.floor(maxButtons / 2);
    let startPage = currentPage - halfMax;
    let endPage = currentPage + halfMax;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="app">
      <h1>Base de données DBLP</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Recherche par titre ou auteurs"
          value={search}
          onChange={handleSearch}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteurs</th>
            <th>Année</th>
            <th>Titre du livre</th>
            <th>Pages</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {publis.map((publi) => (
            <tr key={publi._id}>
              <td>{publi.title}</td>
              <td>{publi.authors.join(', ')}</td>
              <td>{publi.year}</td>
              <td>{publi.booktitle}</td>
              <td>
                {publi.pages && publi.pages.start && publi.pages.end ? (
                  <>
                    {publi.pages.start} - {publi.pages.end}
                  </>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                {publi.url ? (
                  <a href={publi.url} target="_blank" rel="noopener noreferrer">
                    Lien
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        {renderPaginationButtons()}
      </div>
      <div className="page-size-container">
        <label>
          Éléments par page:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default App;