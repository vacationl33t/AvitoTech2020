
import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveIdNews } from '../actions';
import { Card ,Space} from 'antd';
import Moment from 'react-moment';

export const Story = memo(function Story({ storyId }) {
  const [story, setStory] = useState({});
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, [storyId]);

  return story && story.url ? (
    
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title={story.title} extra={<button onClick={() => {
                console.log(storyId);
                dispatch(setActiveIdNews(storyId));
                navigate('/newspage');}}>Читать</button>} style={{ width: 1000 }}>
              <p>Автор: {story.by}</p>
              <p>Рейтинг: {story.score} </p>
              <p>Опубликовано: <Moment unix format='MMM, DD, YYYY • hh:mm a'>{story.time}</Moment></p>
        </Card>
      </Space>
  ) : null;
});
