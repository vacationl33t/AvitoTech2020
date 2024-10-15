import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { store } from './store';
import { Provider } from 'react-redux';
import { StoriesContainer } from './containers/StoriesContainer';
import { NewsContainer } from './containers/NewsContainer';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css'; 

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StoriesContainer />} />
        <Route path='/newspage' element={<NewsContainer />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
