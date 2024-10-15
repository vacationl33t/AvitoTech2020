import React, { useEffect, useState, useRef } from 'react';
import { getStoryIds } from '../services/hnApi';
import { Story } from '../components/Story';
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from '../styles/StoriesContainerStyles';

import styles from './styles.module.css';

export const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);
  const ref = useRef(null)

  const getData = () => { getStoryIds().then(data => setStoryIds(data)); console.log('work!') };

  useEffect(() => {
    getData();
    ref.current = setInterval(getData, 60000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current)
      }
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News</h1>
        <button className={styles.button__stories} onClick={() => { getStoryIds().then(data => setStoryIds(data)); }}>Обновить новости</button>
        {storyIds.slice(0, 99).map(storyId => (
          <div key={storyId}>
            <Story storyId={storyId} />
          </div>
        ))}
      </StoriesContainerWrapper>
    </>
  );
};
