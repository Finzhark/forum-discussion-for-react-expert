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

const upVoteByThreadAction = (payload) => ({
  type: 'UP_VOTE_BY_THREAD',
  payload,
});

const downVoteByThreadAction = (payload) => ({
  type: 'DOWN_VOTE_BY_THREAD',
  payload,
});

const neutralizeThreadVoteAction = (payload) => ({
  type: 'NEUTRALIZE_THREAD_VOTE',
  payload,
});

const getThreadsAndUsersThunkAction = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threads = await api.getAllThreads();
    const users = await api.getAllUsers();
    dispatch(getThreadsAndUsersAction({ users, threads }));
  } catch (error) {
    console.log(error);
    throw error;
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

const upVoteByThreadAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.upVoteThread(param.threadId);
    dispatch(upVoteByThreadAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

const downVoteByThreadAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.downVoteThread(param.threadId);
    dispatch(downVoteByThreadAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

const neutralizeThreadVoteAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.neutralizeThreadVote(param.threadId);
    dispatch(neutralizeThreadVoteAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export {
  getThreadsAndUsersAction,
  getThreadsAndUsersThunkAction,
  createThreadAction,
  createThreadThunkAction,
  upVoteByThreadAsyncAction,
  downVoteByThreadAsyncAction,
  neutralizeThreadVoteAsyncAction,
};
