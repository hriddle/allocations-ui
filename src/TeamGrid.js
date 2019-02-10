import React, {Component} from 'react';
import TeamCard from "./TeamCard";
import {getUTCDate} from "./DateUtils";

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

  isDateInThePast(workingDate) {
    let today = getUTCDate(new Date());
    let date = getUTCDate(new Date(workingDate));
    return date < today;
  }

  render() {
    let teamCards = this.props.teams.map(team => {
      let editable = this.props.isLoggedIn && !this.isDateInThePast(this.props.workingDate);
      return (
        <TeamCard editable={editable} key={team.id} id={team.id} name={team.name} currentTeamMembers={team.currentTeamMembers}
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