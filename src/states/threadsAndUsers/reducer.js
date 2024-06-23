const initState = {
  threads: [],
  users: [],
  created: false,
};

const threadsAndUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_THREADS_AND_USERS':
      return {
        ...state,
        threads: action.payload.threads,
        users: action.payload.users,
        created: false,
      };
    case 'CREATE_THREAD':
      return {
        ...state,
        created: true,
      };
    case 'UP_VOTE_BY_THREAD':
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              upVotesBy: [...thread.upVotesBy, action.payload.userId],
              downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
      };
    case 'DOWN_VOTE_BY_THREAD':
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              downVotesBy: [...thread.downVotesBy, action.payload.userId],
              upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
      };
    case 'NEUTRALIZE_THREAD_VOTE':
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
      };
    default:
      return state;
  }
};

export default threadsAndUsersReducer;
