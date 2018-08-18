import React, {Component} from 'react';
import TeamCard from "./TeamCard";

class TeamGrid extends Component {
  state = {
    workingDate: this.props.workingDate
  };

  render() {
    let teamCards = this.props.teams.map(team => {
      return (
        <TeamCard key={team.id} id={team.id} name={team.name} currentTeamMembers={team.currentTeamMembers}/>
      )
    });

    let unallocatedCard = (
      <TeamCard key="unallocated" id="unallocated" name="Unallocated" currentTeamMembers={this.props.unallocated}/>
    );

    return (
      <content id="grid">{teamCards} {unallocatedCard}</content>
    )
  }
}

export default TeamGrid;