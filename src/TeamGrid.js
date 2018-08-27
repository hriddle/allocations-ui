import React, {Component} from 'react';
import TeamCard from "./TeamCard";

class TeamGrid extends Component {

  render() {
    let teamCards = this.props.teams.map(team => {
      return (
        <TeamCard key={team.id} id={team.id} name={team.name} currentTeamMembers={team.currentTeamMembers}/>
      );
    });

    return (
      <content id="grid">
        {teamCards}
      </content>
    )
  }
}

export default TeamGrid;