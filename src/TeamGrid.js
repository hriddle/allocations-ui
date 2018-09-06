import React, {Component} from 'react';
import TeamCard from "./TeamCard";

class TeamGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    this.setState({teams: this.props.teams})
  }

  componentDidUpdate(prevProps, prevState, _) {
    if (this.props.teams !== prevProps.teams) {
      this.setState({teams: this.props.teams});
    }
  }

  render() {
    let teamCards = this.props.teams.map(team => {
      return (
        <TeamCard editable={this.props.isLoggedIn} key={team.id} id={team.id} name={team.name} currentTeamMembers={team.currentTeamMembers}
                  changePersonTeam={this.props.changePersonTeam} workingDate={this.props.workingDate}/>
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