import React, {Component} from 'react';
import TeamCard from "./TeamCard";

class TeamGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
    this.changePersonTeam = this.changePersonTeam.bind(this);
  }

  componentDidMount() {
    this.setState({teams: this.props.teams})
  }

  componentDidUpdate(prevProps, prevState, _) {
    if (this.props.teams !== prevProps.teams) {
      this.setState({teams: this.props.teams})
    }
  }

  changePersonTeam = function (person, oldTeamId, newTeamId) {
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
    teams[newTeamIndex].currentTeamMembers.push(person);

    this.setState({teams: teams});
  };

  render() {
    let teamCards = this.props.teams.map(team => {
      return (
        <TeamCard key={team.id} id={team.id} name={team.name} currentTeamMembers={team.currentTeamMembers}
                  changePersonTeam={this.changePersonTeam}/>
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