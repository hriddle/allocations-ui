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

  overdueForRotation(person) {
    let weeksOnTeam = 12;
    let date = this.getUTCDate(new Date(person.startDate));
    date.setDate(date.getDate() + (weeksOnTeam * 7));
    return date <= this.props.workingDate;
  }

  newlyRotated(person) {
    let weeks = 4;
    let date = this.getUTCDate(new Date(person.startDate));
    date.setDate(date.getDate() + (weeks * 7));
    return date >= this.props.workingDate;
  }

  getUTCDate(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
  }

  getDotColor(person) {
    if (this.overdueForRotation(person)) {
      return "overdue";
    } else if (this.newlyRotated(person)) {
      return "new-to-team";
    } else {
      return undefined;
    }
  }

  render() {
    const {editable} = this.props;
    let teamList = this.state.teamMembers.sort((a, b) => {
      return Roles[a.role].sortOrder - Roles[b.role].sortOrder;
    }).map(person => {
      let roleAbbreviation = Roles[person.role].abbreviation;
      let dot = "";
      let dotColor = this.getDotColor(person);
      if (dotColor !== undefined) {
        dot = <span className={["dot", dotColor].join(" ")}>●</span>
      }
      let className = "";
      if (person.unsaved === true) className = "unsaved";
      return (
        <li key={person.id} className={className} draggable={editable} onDragStart={e => this.onDragStart(e, person, this.props.id)}>
          <div className="special">{roleAbbreviation}</div>{person.name}{dot}
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
    event.dataTransfer.setData("application/json", JSON.stringify(person));
    event.dataTransfer.setData("oldTeamId", teamId);
  }

  onDrop(event, newTeamId) {
    let person = event.dataTransfer.getData("application/json");
    person = JSON.parse(person);
    let oldTeamId = parseInt(event.dataTransfer.getData("oldTeamId"));
    this.props.changePersonTeam(person, oldTeamId, newTeamId);
  }

  onDragOver(event) {
    event.preventDefault();
  }
}

export default TeamCard;