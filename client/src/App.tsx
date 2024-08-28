import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';

// @ts-ignore
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
