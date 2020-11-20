import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import TableComponent from './components/Table/Table';
import Navigation from './components/Navigation/Navigation';
import './App.module.css';

const App = ({ location }) => {
  const maxEntries = 6;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);

  let history = useHistory();

  const fetchData = async () => {
    setLoading(true);

    await Promise.all([
      fetch('moviedata.json'),
      fetch('peopledata.json')
    ]).then(responses => {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(data => {
      const movieData = data[0];
      const personData = data[1];

      const result = mergeData(movieData, personData);
      console.log(result);
      setData(result);
      setAllGenres(Object.keys(result));
    }).catch(error => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  const mergeData = (movieData, personData) => {
    const mergedData = {};

    Object.keys(movieData).forEach(genre => {
      mergedData[genre] = movieData[genre].map((movie, index) => {
        const directors = findPeople(personData, movie.Director_IDs);
        const writers = findPeople(personData, movie.Writer_IDs);
        const actors = findPeople(personData, movie.Actor_IDs);
        return {
          ...movie,
          Director: directors.join(', '),
          Writer: writers.join(', '),
          Actors: actors.join(', ')
        }
      })
    })

    return mergedData;
  }

  const findPeople = (peopleData, ids) => {
    return ids.map((id) => {
      const person = peopleData.find(person => person.id === id);
      if (person) {
        return `${person.firstName} ${person.lastName}`;
      } 

      return '';
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && allGenres) {
      const { pathname } = location;
      const route = pathname.replace(/\//g, '');
      if (route === '') {
        // meaning they landed on "/"
        // could choose this more programmatically or based on preferences etc
        const genre = allGenres[0];
        history.push(`/${genre}`);
        setCurrentGenre(genre)
      } else {
        setCurrentGenre(route)
      }
    }
  }, [location, data, allGenres])

  const loadingState = loading ? <CircularProgress /> : null;
  const errorState = error ? (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Oops! <strong>Something went wrong here.</strong>
    </Alert>
  ) : null;

  return (
    <>
      <Navigation
        allGenres={allGenres}
      />
      <main>
        {loadingState}
        {errorState}
        {data ? (
          <TableComponent
            data={data}
            maxEntries={maxEntries}
            allGenres={allGenres}
            currentGenre={currentGenre}
          />
        ) : null}
      </main>
    </>
  )
}

export default withRouter(App);