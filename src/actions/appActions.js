import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

function getImages() {
  return {
    type: types.LOAD_IMAGES_REQUEST
  }
}
function receiveSuccess(data) {
  return {
    type: types.LOAD_IMAGES_SUCCESS,
    data
  }
}
function receiveFail(error) {
  return {
    type: types.LOAD_IMAGES_FAIL,
    error
  }
}
export function fetchImages(page, limit) {
  return dispatch => {
    dispatch(getImages(page,limit));
    let url = 'http://localhost:8000/api/images?';
    if(limit){
      url += '_limit=' + limit; 
    }else{
      url += '_limit=25'; 
    }
    if(page){
      url += '&_page=' + page;
    }
    return fetch(url)
      .then(response => response.json())
      .then(
        json => {
          dispatch(receiveSuccess(json));
        },
        error => {
          dispatch(receiveFail(error))
        }
      )
  }
}