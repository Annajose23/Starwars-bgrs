import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const initialState = {
  characters: [],
  films: [],
};

const fetchCharacters = (state, action) => {
  const updatedState = {
    characters: action.payload.results,
  };
  return updateObject(state, updatedState);
};

const updateFilm = (state, action) => {
  const updatedState = {
    films: action.payload,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHARCTERS:
      return fetchCharacters(state, action);
    case actionTypes.FETCH_FILMS:
      return updateFilm(state, action);
    default:
      return state;
  }
};

export default reducer;
