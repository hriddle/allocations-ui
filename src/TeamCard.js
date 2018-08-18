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

class TeamCard extends Component {
  state = {
    teamMembers: this.props.currentTeamMembers,
    workingDate: this.props.workingDate
  };

  render() {
    let teamList = this.state.teamMembers.sort((a, b) => {
      return Roles[a.role].sortOrder - Roles[b.role].sortOrder;
    }).map(person => {
      let special;
      if (person.role !== "DEVELOPER") {
        special = <div className="special">{Roles[person.role].abbreviation}</div>
      }
      return (
        <li key={person.id}
            draggable
            onDragStart={(e) => this.onDragStart(e, person)}
        >
          {special}
          {person.name}
        </li>
      )
    });

    return (
      <div className="team-card"
           onDragOver={(e) => this.onDragOver(e)}
           onDrop={(e) => this.onDrop(e, this.props.id)}
      >
        <h1>{this.props.name}</h1>
        <ul className="team-list">
          {teamList}
        </ul>
      </div>
    )
  }

  onDragStart(event, person) {
    event.dataTransfer.setData("personId", person.id);
    event.dataTransfer.setData("personName", person.name);
  }

  onDrop(event, teamName) {
    let personId = event.dataTransfer.getData("personId");
    let personName = event.dataTransfer.getData("personName");
    let person = {id: personId, name: personName};
    this.setState({teamMembers: this.state.teamMembers.concat([person])});
  }

  onDragOver(event) {
    event.preventDefault();
  }

}

export default TeamCard;