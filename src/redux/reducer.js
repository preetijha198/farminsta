import { ADD_USER, UPDATE_USER, SET_USERS } from './actions';

const initialState = {
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((u) =>
          u.email === action.payload.email ? action.payload : u
        ),
      };
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
