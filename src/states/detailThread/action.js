import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../services/api';

const getThreadAction = (payload) => ({
  type: 'GET_THREAD',
  payload,
});

const commentCreatedAction = () => ({
  type: 'COMMENT_CREATED',
});

const upVoteByThreadDetailAction = (payload) => ({
  type: 'UP_VOTE_BY_THREAD_DETAIL',
  payload,
});

const downVoteByThreadDetailAction = (payload) => ({
  type: 'DOWN_VOTE_BY_THREAD_DETAIL',
  payload,
});

const neutralizeThreadVoteDetailAction = (payload) => ({
  type: 'NEUTRALIZE_THREAD_VOTE_DETAIL',
  payload,
});

const getThreadDetailThunkAction = (id) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const data = await api.getThreadDetail(id);
    dispatch(getThreadAction(data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const createCommentThunkAction = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.createComment({ threadId, content });
    dispatch(commentCreatedAction());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoading());
  }
};

const upVoteByThreadDetailAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.upVoteThread(param.threadId);
    dispatch(upVoteByThreadDetailAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

const downVoteByThreadDetailAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.downVoteThread(param.threadId);
    dispatch(downVoteByThreadDetailAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

const neutralizeThreadVoteDetailAsyncAction = (param) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.neutralizeThreadVote(param.threadId);
    dispatch(neutralizeThreadVoteDetailAction(param));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export {
  getThreadAction,
  getThreadDetailThunkAction,
  commentCreatedAction,
  createCommentThunkAction,
  upVoteByThreadDetailAsyncAction,
  downVoteByThreadDetailAsyncAction,
  neutralizeThreadVoteDetailAsyncAction,
};
