import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCommentThunkAction,
  getThreadDetailThunkAction,
  upVoteByThreadDetailAsyncAction,
  downVoteByThreadDetailAsyncAction,
  neutralizeThreadVoteDetailAsyncAction,
} from '../states/detailThread/action';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatdate';
import parse from 'html-react-parser';

function DetailThread() {
  const { thread, created } = useSelector((state) => state.threadDetail);
  const { profile } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [content, setContent] = React.useState('');
  const dispatch = useDispatch();

  const handleNeutralizeThreadVote = (threadId) => {
    dispatch(
      neutralizeThreadVoteDetailAsyncAction({
        threadId,
        userId: profile.id,
      }),
    );
  };

  const handleUpVoteThread = (threadId) => {
    if (!thread.upVotesBy.includes(profile.id)) {
      dispatch(upVoteByThreadDetailAsyncAction({
        threadId,
        userId: profile.id,
      }));
    } else {
      handleNeutralizeThreadVote(threadId);
    }
  };

  const handleDownVoteThread = (threadId) => {
    if (!thread.downVotesBy.includes(profile.id)) {
      dispatch(downVoteByThreadDetailAsyncAction({
        threadId,
        userId: profile.id,
      }));
    } else {
      handleNeutralizeThreadVote(threadId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCommentThunkAction({ threadId: id, content }));
  };

  useEffect(() => {
    dispatch(getThreadDetailThunkAction(id));
  }, []);

  useEffect(() => {
    if (created) {
      dispatch(getThreadDetailThunkAction(id));
    }
  }, [created]);
  return (
    <div className="detail-thread">
      <h1>Detail Thread</h1>
      {thread && (
        <div>
          <p>{thread.category}</p>
          <h1>{thread.title}</h1>
          <p>{parse(thread.body)}</p>
          <div className="user-info">
            <img src={thread.owner?.avatar} alt="" />
            <div className="user-info-detail">
              <p>{thread.owner?.name}</p>
              <p>{formatDate(thread.createdAt)}</p>
            </div>
          </div>
          <div>
            <button type="button" onClick={() => handleUpVoteThread}>
              <p>Up</p>
              <p>{thread.upVotesBy?.length}</p>
            </button>
            <button type="button" onClick={() => handleDownVoteThread}>
              <p>Down</p>
              <p>{thread.downVotesBy?.length}</p>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <button type="submit">
              Comment
            </button>
          </form>
          {thread.comments?.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>{formatDate(comment.createdAt)}</p>
              <div className="flex">
                <img src={comment.owner?.avatar} alt="" />
                <p>{comment.owner?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DetailThread;
