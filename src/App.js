import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

const BITLY_BASE_URI = 'https://api-ssl.bitly.com/v4';

// Insert token here.
const token = 'fake';

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shortenedLinks: [],
    };
    this.shortenLink = this.shortenLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    // Fetch user.
    fetch(`${BITLY_BASE_URI}/user`, { method: 'GET', headers })
      .then(res => res.json())
      .then((user) => {
        this.setState({ user });
      });
  }
  handleChange({ target }) {
    this.setState({ longUrl: target.value });
  }
  shortenLink() {
    const body = JSON.stringify({ long_url: this.state.longUrl });
    console.log(body);
    return fetch(`${BITLY_BASE_URI}/shorten`, { method: 'POST', headers, body })
      .then(res => res.json())
      .then((json) => {
        const temp = this.state.shortenedLinks;
        temp.push(json.link);
        this.setState({ shortenedLinks: temp });
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Login: {this.state.user.login}
          </p>
          <p>
            <input 
              type="text" 
              name="longUrl" 
              placeholder="Enter URL here..." 
              value={ this.state.longUrl }
              onChange={ this.handleChange } 
            />
            <button onClick={ this.shortenLink }>Shorten</button>
          </p>
          <ul>
            {this.state.shortenedLinks.map(item => <li>{item}</li>)}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
