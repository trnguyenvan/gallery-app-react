import * as types from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
  isEnded: false,
  loading: true,
  success: false,
  data: [],
  error: undefined
};
export function getImages(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_IMAGES_REQUEST:
      return {
        ... state,
        loading: true,
        success: false,
        error: undefined
      };
   case types.LOAD_IMAGES_SUCCESS:
      let newData = _.concat(state.data, action.data);
      return {
        ... state,
        loading: false,
        success: true,
        data: newData,
        error: undefined,
        isEnded: action.data.length === 0
      };
   case types.LOAD_IMAGES_FAIL:
      return {
        ... state,
        loading: false,
        success: false,
        data: [],
        error: action.error
      };   
    default:
      return state
  }
}