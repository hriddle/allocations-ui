import React, {Component} from 'react';

class TeamCard extends Component {

  render() {
    function abbreviateRole(role) {
      if (role === "PM" || role === "BSO" || role === "QA") {
        return role
      } else if (role === "ANCHOR") {
        return "A"
      } else if (role === "DESIGNER") {
        return "D"
      }
    }

    function sortOrder(role) {
      return {
        "PM": 1,
        "BSO": 2,
        "ANCHOR": 3,
        "DEVELOPER": 4,
        "DESIGNER": 5,
        "QA": 6
      }[role];
    }

    let teamList = this.props.currentTeamMembers.sort((a, b) => {
      return sortOrder(a.role) - sortOrder(b.role);
    }).map(person => {
      let special;
      if (person.role !== "DEVELOPER") {
        special = <div className="special">{abbreviateRole(person.role)}</div>
      }
      return (
        <li draggable="true" key={person.id}>
          {special}
          {person.name}
        </li>
      )
    });

    return (
      <div className="team-card">
        <h1>{this.props.name}</h1>
        <ul className="team-list">
          {teamList}
        </ul>
      </div>
    )
  }
}

export default TeamCard;