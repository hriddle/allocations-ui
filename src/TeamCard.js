import React, {Component} from 'react';

const Roles = {
  "PM": {abbreviation: "PM", sortOrder: 1},
  "BSO": {abbreviation: "BSO", sortOrder: 2},
  "ANCHOR": {abbreviation: "A", sortOrder: 3},
  "DEVELOPER": {abbreviation: "", sortOrder: 4},
  "DESIGNER": {abbreviation: "D", sortOrder: 5},
  "QA": {abbreviation: "QA", sortOrder: 6},
  "UNKNOWN": {abbreviation: "?", sortOrder: 100}
};

let workingDate = new Date();

class TeamCard extends Component {
  state = {
    teamMembers: this.props.currentTeamMembers
  };

  render() {
    let teamList = this.state.teamMembers.sort((a, b) => {
      return Roles[a.role].sortOrder - Roles[b.role].sortOrder;
    }).map(person => {
      let special = <div className="special">{Roles[person.role].abbreviation}</div>;
      return (
        <li key={person.id}
            draggable
            onDragStart={e => this.onDragStart(e, person)}
            onDragEnd={e => this.onDragEnd(e, person, this.props.id)}
        >
          {special}{person.name}
        </li>
      )
    });

    return (
      <div className="team-card"
           onDragOver={e => this.onDragOver(e)}
           onDrop={e => this.onDrop(e, this.props.id)}
      >
        <h1>{this.props.name}</h1>
        <ul className="team-list">
          {teamList}
        </ul>
      </div>
    )
  }

  onDragStart(event, person) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("personId", person.id);
    event.dataTransfer.setData("personName", person.name);
  }

  onDragEnd(event, person, teamId) {
    if (event.dataTransfer.dropEffect === "none") return;

    // TODO this does not work. move the add/remove functions out to TeamGrid.js
    if (event.target.value === teamId) {
      console.log("dropped onto same team")
    } else {
      console.log("dropped onto " + event.target.value);
      this.removePersonFromTeam(person);
    }
  }

  onDrop(event) {
    let personId = event.dataTransfer.getData("personId");
    let personName = event.dataTransfer.getData("personName");
    let person = {id: personId, name: personName, role: "UNKNOWN"};

    let notMoved = this.state.teamMembers.some(p => {
      return p["id"] == person.id;
    });

    if (notMoved) {
      console.log("dropped onto same team")
    } else {
      this.addPersonToTeam(person);
    }
  }

  onDragOver(event) {
    event.preventDefault();
  }

  addPersonToTeam(person) {
    this.setState({teamMembers: this.state.teamMembers.concat([person])});
  }

  removePersonFromTeam(person) {
    let teamMembers = this.state.teamMembers;
    teamMembers.splice(teamMembers.findIndex(p => {
      return p.id == person.id
    }), 1);
    this.setState({teamMembers: teamMembers});
  }
}

export default TeamCard;