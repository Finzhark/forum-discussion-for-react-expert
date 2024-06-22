/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatDate from '../utils/formatdate';
import { getThreadsAndUsersThunkAction } from '../states/threadsAndUsers/action';
import { Link, useNavigate } from 'react-router-dom';

function Homepage() {
  const { threads, users } = useSelector((state) => state.threadsAndUsers);
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    dispatch(getThreadsAndUsersThunkAction());
  }, []);
  return (
    <div className="homepage">
      <h1>Forum Discussion</h1>
      <div>
        {threads.map((thread) => (
          <div className="discuss-box" key={thread.id}>
            <h1 onClick={() => handleDetail(thread.id)} style={{ cursor: 'pointer' }}>{thread.title}</h1>
            <div className="user-info">
              <img src={users.find((user) => user.id === thread.ownerId).avatar} />
              <div className="user-info-detail">
                <p><b>{users.find((user) => user.id === thread.ownerId).name}</b></p>
                <p>{formatDate(thread.createdAt)}</p>
              </div>
            </div>
            <p>{thread.upVotesBy}</p>
            <p>{thread.downVotesBy}</p>
            <p>{thread.totalComments}</p>
            <p>{thread.body}</p>
          </div>
        ))}
        {isLogin && <Link to="/create" className="add-thread">Tambah Thread</Link>}
      </div>
    </div>
  );
}

export default Homepage;
