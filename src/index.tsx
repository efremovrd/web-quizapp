import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { JWTState } from './hooks/jwt';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <JWTState>
      <App /> 
    </JWTState>
  </BrowserRouter>
)
