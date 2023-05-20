import './App.css';
import { FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap, FaPhone, FaLock } from 'react-icons/fa';
import React from 'react';

const url = 'https://randomuser.me/api/';

const defaultImage = 'https://randomuser.me/api/portraits/med/women/80.jpg';

class App extends React.Component{
  constructor(){
    super();
    this.state = {loading: true, person: null, title: 'name', value: 'random person'};
    this.handleValue = this.handleValue.bind(this);
    this.getPerson = this.getPerson.bind(this);
  }

  handleValue(e){
    if(e.target.classList.contains("icon")){
      this.setState({title: e.target.ariaLabel, value: this.state.person[e.target.ariaLabel]});
    }
  }

  async getPerson(){
    this.setState({loading: true});
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large:image } = person.picture;
    const { login: { password } } = person;
    const { first, last } = person.name;
    const { dob: { age } } = person;
    const { street: { number, name } } = person.location;

    const newPerson = {image,
      phone,
      email,
      password,
      age,
      street: `${name} ${number}`,
      name: `${first} ${last}`
    };
    this.setState({loading: false, person: newPerson, title: "name", value: newPerson.name});
  }

  componentDidMount(){
    this.getPerson();
  }

  render(){
    return <main>
      <div className="block bcg-black"/>
      <div className="block">
          <div className="container">
            <img src={(this.state.person && this.state.person.image) || defaultImage } 
            alt="" 
            className="user-img"/>
            <p className="user-title">My {this.state.title} is</p>
            <p className="user-value">{this.state.value}</p>
            <div className="values-list">
              <button onMouseOver={this.handleValue} className="icon" aria-label="name"><FaUser/></button>
              <button onMouseOver={this.handleValue} className="icon" aria-label="email"><FaEnvelopeOpen/></button>
              <button onMouseOver={this.handleValue} className="icon" aria-label="age"><FaCalendarTimes/></button>
              <button onMouseOver={this.handleValue} className="icon" aria-label="street"><FaMap/></button>
              <button onMouseOver={this.handleValue} className="icon" aria-label="phone"><FaPhone/></button>
              <button onMouseOver={this.handleValue} className="icon" aria-label="password"><FaLock/></button>
            </div>
            <button onClick={this.getPerson} disabled={this.state.loading} className="btn">
              {this.state.loading ? 'Loading user...' : 'Show random user'}
            </button>
          </div>
        </div>
    </main>
  }
}

export default App;
