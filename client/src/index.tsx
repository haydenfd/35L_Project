import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import ProfilePage from './Components/Profile/ProfilePage'
// import Test from './Components/Tests/Test'
import reportWebVitals from './reportWebVitals';
import MainPage from './Components/MainPage/MainPage';
import ListingPage from './Components/ListingPage/ListingPage';
import Register from './Components/Modals/Register'
import Login from './Components/Modals/Login'
import Upload from './Components/ListingPage/Upload'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          {/* <Route path="/profile" element={<ProfilePage />}/> */}
          <Route path="/profile/:username" element={<ProfilePage />}/>
          <Route path="/listing/:id" element={<ListingPage />}/>
          {/* <Route path="/test" element={<Register />}/> */}
          <Route path="/test" element={<Upload />}/>
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
