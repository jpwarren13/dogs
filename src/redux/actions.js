import { ADD_DOG, REMOVE_DOG, TOGGLE_DOG ,FILTER_DOGS, SORT_DOGS, SET_FILTER } from "./actionTypes";


export const addDog = dog => ({
  type: ADD_DOG,
  payload: {
    dog
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_DOG,
  payload: { id }
});

export const removeDog = id => ({
    type: REMOVE_DOG,
    payload: { id }
  });

export const filterDog = (filterString, key) => ({
    type: FILTER_DOGS,
    payload: {filterString, key}
})


export const sortDogs = (key, ascending, descending) => ({
    type: SORT_DOGS,
    payload: {key, ascending, descending}
})
export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });