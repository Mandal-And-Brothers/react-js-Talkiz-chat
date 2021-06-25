import React from "react";
import Login from "./component/pages/Login";
import User from "./component/pages/User";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      chat: false,
      data: ''
    }
  }

  componentDidMount() {
    let test = localStorage.getItem('Talkiz-id');
    test = JSON.parse(test);
    this.setState({ data: test });
    if (test === null) {
      this.setState({chat : false});
    }
    else {
      this.setState({chat : true});
    }
  }

  render() {
    const { chat } = this.state;
    return (
      <div>
        {
          !chat ?
            <Login/>
            :
            <User/>
        }
      </div>
    );
  }
}

export default App;
