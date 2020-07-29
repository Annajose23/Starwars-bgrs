import * as actionTypes from "./actionTypes";

export const setCharacters = (response) => {
  return {
    type: actionTypes.FETCH_CHARCTERS,
    payload: response,
  };
};

export const setFilms = (movies) => {
  return {
    type: actionTypes.FETCH_FILMS,
    payload: movies,
  };
};

export const onInitCharacters = () => {
  return (dispatch) => {
    return fetch(`https://swapi.dev/api/people/`, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        return dispatch(setCharacters(response));
      })
      .catch((error) => console.log(error));
  };
};

export const fetchFilms = (UrlList) => {
  return (dispatch) =>
    Promise.all(
      UrlList.map((movieUrl) => fetch(movieUrl).then((res) => res.json()))
    ).then((movies) => dispatch(setFilms(movies)));
};
