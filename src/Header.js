import React, {Component} from 'react';

class Header extends Component {

  render() {
    let unallocatedList = this.props.unallocated.map(person => {
      return <li>{person.name}</li>
    });

    return (
      <header>
        Allocations
        <div className="unallocated">
          <ul>{unallocatedList}</ul>
        </div>
      </header>
    )
  }
}

export default Header;