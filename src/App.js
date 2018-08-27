import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

let isEffective = function (object, effectiveDate = new Date()) {
  let startDate = new Date(object.startDate);
  let endDate = new Date(object.endDate);
  return effectiveDate >= startDate && effectiveDate <= endDate;
};

const host = 'https://allocations-graph.herokuapp.com';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      unallocated: []
    };
  }

  fetchProducts() {
    fetch(host + '/products', {mode: 'cors'})
      .then(results => {
        return results.json()
      }).then(teamList => {
      let teams = teamList.map(team => {
        return {
          id: team.id,
          name: team.name,
          currentTeamMembers: team.team.filter(person => {
            return isEffective(person)
          }).map(person => {
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

  render() {
    return (
      <div id="container">
        <Header />
        <TeamGrid teams={this.state.teams} />
      </div>
    );
  }
}

export default App;
