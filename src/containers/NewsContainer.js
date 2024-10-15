import React, { useEffect, useState } from 'react';
import { getStory } from '../services/hnApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Comments } from '../components/Comments'
import Moment from 'react-moment';

import styles from './styles.module.css';

export const NewsContainer = () => {
  const [story, setStory] = useState({});
  const [kids, setKids] = useState([]);
  const { activeIdNews } = useSelector(({ root }) => root);
  let navigate = useNavigate();

  const apiFunction = () => {
    getStory(activeIdNews).then(data => data && data.url && setStory(data)).catch(() => { navigate('/') });
  }

  useEffect(() => {
    apiFunction()
  }, [activeIdNews, setStory]);

  useEffect(() => {
    if (story !== {} && story.kids) { 
      setKids(story.kids);
    }
  }, [story])

  return (
    <div className={styles.container}>
      <button className={styles.button__news} onClick={() => {
        navigate('/');
      }}>Вернуться к новостям</button>
      <Card title={story.title} style={{ width: 1000 }}>
        <p>Опубликовано: <Moment unix format='MMM, DD, YYYY • hh:mm a'>{story.time}</Moment></p>
        <p>Автор: {story.by}</p>
        <a href={story.url}>Перейти к источнику новости</a>
        <p>Кол-во коминтариев: {kids ? kids.length : 0}</p>
        <button onClick={() => apiFunction()}>Обновить комментарии</button>
        {kids && <Comments commentIds={kids} />}
      </Card>
    </div>
  )
};
