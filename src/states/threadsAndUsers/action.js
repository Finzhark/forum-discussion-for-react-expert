import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../services/api';

const getThreadsAndUsersAction = ({ threads, users }) => ({
  type: 'GET_THREADS_AND_USERS',
  payload: {
    threads,
    users,
  },
});

const createThreadAction = () => ({
  type: 'CREATE_THREAD',
});

const upVoteByThreadAction = () => ({
  type: 'UP_VOTE_BY_THREAD'
})

const downVoteByThreadAction = () => ({
  type: 'DOWN_VOTE_BY_THREAD'
})

const getThreadsAndUsersThunkAction = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threads = await api.getAllThreads();
    const users = await api.getAllUsers();
    dispatch(getThreadsAndUsersAction({ users, threads }));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const createThreadThunkAction = (thread) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.createThread(thread);
    dispatch(createThreadAction());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const upVoteByThreadAsyncAction = (param) => {
  dispatch(showLoading())
  try {
    await api.upVoteThread(param.threadId)
    dispatch(upVoteByThreadAction(AudioParam))
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    dispatch(hideLoading())
  }
}

export {
  getThreadsAndUsersAction, getThreadsAndUsersThunkAction, createThreadAction, createThreadThunkAction,
};
