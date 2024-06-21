import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunkAction, getThreadDetailThunkAction } from '../states/detailThread/action';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatdate';

function DetailThread() {
  const { thread, created } = useSelector((state) => state.threadDetail);
  const { id } = useParams();
  const [content, setContent] = React.useState('');
  const dispatch = useDispatch();

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
          <p>{thread.body}</p>
          <div className="user-info">
            <img src={thread.owner?.avatar} alt="" />
            <div className="user-info-detail">
              <p>{thread.owner?.name}</p>
              <p>{formatDate(thread.createdAt)}</p>
            </div>
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
          <p>{thread.comments?.length}</p>
          {thread.comments?.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>{formatDate(comment.createdAt)}</p>
              <div style={{ display: 'flex' }}>
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
