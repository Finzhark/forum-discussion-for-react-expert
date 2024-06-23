import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLeaderboardsAsyncAction from '../states/leaderboards/action';

function Leaderboards() {
  const { leaderboards } = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderboardsAsyncAction());
  }, []);
  return (
    <div className="leaderboards-page">
      <h1>Leaderboards</h1>
      {leaderboards.map((leaderboard) => (
        <div>
          <div>{leaderboard.user.name}</div>
          <div>{leaderboard.score}</div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboards;
