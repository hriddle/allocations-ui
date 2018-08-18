import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

let isEffective = function(object, effectiveDate = new Date()) {
  let startDate = new Date(object.startDate);
  let endDate = new Date(object.endDate);
  return effectiveDate >= startDate && effectiveDate <= endDate;
};

function getWorkingDate() {
  return new Date().setHours(0, 0, 0, 0);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      unallocated: []
    };
  }

  fetchProducts() {
    fetch('https://allocations-graph.herokuapp.com/products', {mode: 'cors'})
      .then(results => {
        return results.json()
      }).then(data => {
      let teamCards = data.map(team => {
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
      this.setState({teams: teamCards});
    })
  }

  fetchPeople() {
    // let host = "https://allocations-graph.herokuapp.com";
    let host = "http://localhost:8080";
    fetch(host + '/people', {mode: 'cors'})
      .then(results => {
        return results.json()
      }).then(data => {
      let unallocatedPeople = data.filter(person => {
        let currentProducts = person.productHistory.filter(product => {
          return isEffective(product)
        });
        return currentProducts.length === 0;
      });
      this.setState({unallocated: unallocatedPeople});
    })
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchPeople();
  }

  render() {
    return (
      <div id="container">
        <Header />
        <TeamGrid workingDate={getWorkingDate()} teams={this.state.teams} unallocated={this.state.unallocated}/>
      </div>
    );
  }
}

export default App;
