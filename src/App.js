import React, { Component } from "react";
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    const apiKey = process.env.REACT_APP_API_KEY; // Access API key from .env.local

    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* Pass the apiKey directly to the News component */}
            <Route exact path="/" element={<News key="home" apiKey={apiKey} pageSize={8} country="us" category="general" />} />
            <Route exact path="/sports" element={<News key="sports" apiKey={apiKey} pageSize={8} country="us" category="sports" />} />
            <Route exact path="/business" element={<News key="business" apiKey={apiKey} pageSize={8} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" apiKey={apiKey} pageSize={8} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" apiKey={apiKey} pageSize={8} country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" apiKey={apiKey} pageSize={8} country="us" category="science" />} />
            <Route exact path="/technology" element={<News key="technology" apiKey={apiKey} pageSize={8} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
