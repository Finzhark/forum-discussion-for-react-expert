const initState = {
  leaderboards: [],
};

const leaderboardsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_LEADERBOARDS':
      return {
        ...state,
        leaderboards: action.payload,
      };
    default:
      return state;
  }
};

export default leaderboardsReducer;
