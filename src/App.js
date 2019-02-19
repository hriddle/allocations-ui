import React, {Component} from 'react';
import './App.css';
import TeamGrid from "./TeamGrid";
import Header from "./Header";

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
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleAddPerson = this.handleAddPerson.bind(this);
    this.getEdits = this.getEdits.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.addProduct = this.addProduct.bind(this);
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

  handleAddProduct = (name, description) => {
    this.addProduct(name, description);
  };

  handleAddPerson = (name, company, role, level) => {
    this.addPerson(name, company, role, level);
  };

  storePersonRotation(person, oldTeamId, newTeamId) {
    let originalIndex = this.state.edits.findIndex(e => {
      return e.op === "person.rotate" && e.person.id === person.id && e.from === newTeamId && e.to === oldTeamId;
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
      return e.op === "person.rotate" && e.person.id === person.id
    });
    if (previousMoveIndex !== -1) {
      let edits = this.state.edits;
      edits[previousMoveIndex].to = newTeamId;
      this.setState({edits: edits});
      return;
    }
    let newEdit = {
      op: "person.rotate",
      date: formatDate(this.state.workingDate),
      person: person,
      from: oldTeamId,
      to: newTeamId
    };
    this.storeEdit(newEdit);
  };

  storeEdit(edit) {
    let edits = this.state.edits;
    edits.push(edit);
    this.setState({edits: edits})
  };

  storeNewProduct(product) {
    let newEdit = {
      op: "product.add",
      date: formatDate(this.state.workingDate),
      product: product
    };
    this.storeEdit(newEdit);
  }

  storeNewPerson(person) {
    let newEdit = {
      op: "person.add",
      date: formatDate(this.state.workingDate),
      person: person
    };
    this.storeEdit(newEdit);
  }

  getEdits() {
    return this.state.edits
  };

  fetchProducts(date = new Date()) {
    let host = process.env.REACT_APP_ALLOCATIONS_API_HOST;
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
      teams.push({
        id: "UNALLOCATED",
        name: "Unallocated",
        currentTeamMembers: []
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

    this.storePersonRotation(person, oldTeamId, newTeamId);

    teams[newTeamIndex].currentTeamMembers.push(person);
    this.setState({teams: teams});
  };

  addProduct(name, description) {
    let newProduct = {
      id: name.toLowerCase().replace(" ", "-"),
      name: name,
      description: description,
      startDate: formatDate(this.state.workingDate),
      currentTeamMembers: []
    };
    newProduct.unsaved = true;
    this.storeNewProduct(newProduct);

    let teams = this.state.teams;
    teams.push(newProduct);
    this.setState({teams: teams});
  };

  addPerson(name, company, role, level) {
    let newPerson = {
      id: name.toLowerCase().replace(" ", "-"),
      name: name,
      company: company,
      role: role,
      level: level,
      startDate: formatDate(this.state.workingDate)
    };
    newPerson.unsaved = true;
    this.storeNewPerson(newPerson);

    let teams = this.state.teams;
    teams["UNALLOCATED"].currentTeamMembers.push(newPerson);
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
        <Header isLoggedIn={this.state.isLoggedIn}
                handleLogin={this.handleLogin}
                setWorkingDate={this.setWorkingDate}
                currentWorkingDate={this.state.workingDate}
                getEdits={this.getEdits}
                handleAddPerson={this.handleAddPerson}
                handleAddProduct={this.handleAddProduct}
        />
        <TeamGrid isLoggedIn={this.state.isLoggedIn}
                  teams={this.state.teams}
                  workingDate={this.state.workingDate}
                  changePersonTeam={this.changePersonTeam}
        />
      </div>
    );
  }
}

export default App;
