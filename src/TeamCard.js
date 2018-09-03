import React, {Component} from 'react';
import Card from '@material-ui/core/Card';


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
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: []
    }
  }

  componentDidMount() {
    this.setState({teamMembers: this.props.currentTeamMembers})
  }

  componentDidUpdate(prevProps, prevState, _) {
    if (this.props.currentTeamMembers !== prevProps.currentTeamMembers) {
      this.setState({teamMembers: this.props.currentTeamMembers})
    }
  }

  render() {
    let teamList = this.state.teamMembers.sort((a, b) => {
      return Roles[a.role].sortOrder - Roles[b.role].sortOrder;
    }).map(person => {
      let special = <div className="special">{Roles[person.role].abbreviation}</div>;
      return (
        <li key={person.id} draggable onDragStart={e => this.onDragStart(e, person, this.props.id)}>
          {special}{person.name}
        </li>
      )
    });

    return (
      <Card className="team-card" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, this.props.id)}>
        <h1>{this.props.name}</h1>
        <ul className="team-list">
          {teamList}
        </ul>
      </Card>
    )
  }

  onDragStart(event, person, teamId) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("personId", person.id);
    event.dataTransfer.setData("personName", person.name);
    event.dataTransfer.setData("oldTeamId", teamId);
  }

  onDrop(event, newTeamId) {
    let personId = parseInt(event.dataTransfer.getData("personId"));
    let personName = event.dataTransfer.getData("personName");
    let person = {id: personId, name: personName, role: "UNKNOWN"};
    let oldTeamId = parseInt(event.dataTransfer.getData("oldTeamId"));
    this.props.changePersonTeam(person, oldTeamId, newTeamId);
  }

  onDragOver(event) {
    event.preventDefault();
  }
}

export default TeamCard;