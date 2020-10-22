import React, {useEffect, useState} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import TableComponent from './components/Table';
import Navigation from './components/Navigation/Navigation';
import './App.module.css';

const App = ({location}) => {
  const maxEntries = 6;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);

  let history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('projectdata.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(jsonData => {
        setLoading(false);
        setData(jsonData);
        setAllGenres(Object.keys(jsonData))
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })

    return () => {
      setLoading(false);
    }
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
      <Navigation/>
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
