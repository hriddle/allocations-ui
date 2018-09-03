import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

const host = 'https://allocations-graph.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      unallocated: [],
      workingDate: new Date()
    };
    this.setWorkingDate = this.setWorkingDate.bind(this);
  }

  setWorkingDate = function (workingDate) {
    this.setState({workingDate: workingDate});
  };

  fetchProducts(queryDate = new Date().toISOString().substr(0, 10)) {
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
        <Header setWorkingDate={this.setWorkingDate} currentWorkingDate={this.state.workingDate}/>
        <TeamGrid teams={this.state.teams} workingDate={this.state.workingDate}/>
      </div>
    );
  }
}

export default App;
