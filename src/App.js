import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

const host = 'https://allocations-graph.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      teams: [],
      unallocated: [],
      workingDate: new Date()
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.setWorkingDate = this.setWorkingDate.bind(this);
  }

  handleLogin = validCredentials => {
    if (validCredentials) {
      this.setState({isLoggedIn: true})
    }
  };

  setWorkingDate = function (workingDate) {
    this.setState({workingDate: workingDate});
  };

  fetchProducts(date = new Date()) {
    let queryDate = date.toISOString().substr(0,10);
    fetch(host + '/products?date=' + queryDate, {mode: 'cors'})
      .then(results => {
        return results.json()
      }).then(teamList => {
      let teams = teamList.map(team => {
        return {
          id: team.id,
          name: team.name,
          currentTeamMembers: team.team.map(person => {
            return {
              id: person.id,
              name: person.name,
              role: person.role,
              startDate: person.startDate,
              endDate: person.endDate
            }
          })
        };
      });
      this.setState({teams: teams});
    })
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps, prevState, _) {
    if (this.state.workingDate !== prevState.workingDate) {
      this.fetchProducts(this.state.workingDate)
    }
  }

  render() {
    return (
      <div id="container">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} setWorkingDate={this.setWorkingDate} currentWorkingDate={this.state.workingDate}/>
        <TeamGrid teams={this.state.teams} workingDate={this.state.workingDate}/>
      </div>
    );
  }
}

export default App;
