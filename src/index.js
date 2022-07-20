import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.less';
import 'antd/dist/antd.css';
import "swiper/css/navigation";
import 'swiper/css';
import App from './App';
import { StoreProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
