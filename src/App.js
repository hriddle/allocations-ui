import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

const host = 'http://localhost:8080';//'https://allocations-graph.herokuapp.com';

let formatDate = date => {
  return date.toISOString().substr(0, 10);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      teams: [],
      unallocated: [],
      workingDate: new Date(),
      edits: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.setWorkingDate = this.setWorkingDate.bind(this);
    this.getEdits = this.getEdits.bind(this);
    this.changePersonTeam = this.changePersonTeam.bind(this);
  }

  handleLogin = validCredentials => {
    if (validCredentials) {
      this.setState({isLoggedIn: true})
    }
  };

  setWorkingDate = function (workingDate) {
    this.setState({workingDate: workingDate});
  };

  storeEdit(op, person, oldTeamId, newTeamId) {
    if (op === "move") {
      let originalIndex = this.state.edits.findIndex(e => {
        return e.op === "move" && e.person.id === person.id && e.from === newTeamId && e.to === oldTeamId;
      });
      if (originalIndex !== -1) {
        let edits = this.state.edits;
        edits.splice(originalIndex, 1);
        this.setState({edits: edits});

        let teamIndex = this.state.teams.findIndex(team => {return team.id === newTeamId});
        this.state.teams[teamIndex].currentTeamMembers.forEach(p => {
          if (person.id === p.id) {
            person.unsaved = false;
          }
        });
        return;
      }
      let previousMoveIndex = this.state.edits.findIndex(e => {
        return e.op === "move" && e.person.id === person.id
      });
      if (previousMoveIndex !== -1) {
        let edits = this.state.edits;
        edits[previousMoveIndex].to = newTeamId;
        this.setState({edits: edits});
        return;
      }
    }
    let newEdit = {
      op: op,
      date: formatDate(this.state.workingDate),
      person: person,
      from: oldTeamId,
      to: newTeamId
    };

    let edits = this.state.edits;
    edits.push(newEdit);
    this.setState({edits: edits})
  };

  getEdits() {
    return this.state.edits
  };

  fetchProducts(date = new Date()) {
    fetch(host + '/products?date=' + formatDate(date), {mode: 'cors'})
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
              company: person.company,
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

  changePersonTeam(person, oldTeamId, newTeamId) {
    if (oldTeamId === newTeamId) {
      return;
    }
    let oldTeamIndex = this.state.teams.findIndex((element) => {
      return element.id === oldTeamId
    });
    let newTeamIndex = this.state.teams.findIndex((element) => {
      return element.id === newTeamId
    });
    let teams = this.state.teams;
    teams[oldTeamIndex].currentTeamMembers.splice(teams[oldTeamIndex].currentTeamMembers.findIndex(p => {
      return p.id === person.id
    }), 1);
    person.unsaved = true;
    teams[newTeamIndex].currentTeamMembers.push(person);

    this.storeEdit("move", person, oldTeamId, newTeamId);
    this.setState({teams: teams});
  };

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
        <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} setWorkingDate={this.setWorkingDate} currentWorkingDate={this.state.workingDate}
                getEdits={this.getEdits}/>
        <TeamGrid isLoggedIn={this.state.isLoggedIn} teams={this.state.teams} workingDate={this.state.workingDate} changePersonTeam={this.changePersonTeam}/>
      </div>
    );
  }
}

export default App;
