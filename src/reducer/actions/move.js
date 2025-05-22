import actionTypes from "../actionTypes.js";
export const makeNewMove = ({ newPosition }) => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPosition },
  };
};
