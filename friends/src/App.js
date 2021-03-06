import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import FriendsList from './Components/FriendsList';
import FriendForm from './Components/FriendForm';
import Friend from './Components/Friend';
import './App.css';

const serverRoot = 'http://localhost:5000';

class App extends Component {
  constructor() {
    super()
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    axios
      .get(serverRoot + '/friends')
      .then(res => this.setState({friends: res.data}))
      .catch(error => console.log(error));
  }

  modifyFriendsList = (friendObj) => {
    axios
      .put(serverRoot + '/friends/' + friendObj.id, friendObj)
      .then(res => this.setState({friends: res.data}))
      .catch(error => console.log(error)); 
  }

  addNewFriend = (newFriendObj) => {
    console.log(newFriendObj)
    axios
      .post(serverRoot + '/friends', newFriendObj)
      .then(res => this.setState({friends: res.data}))
      .catch(error => console.log(error));
  }

  deleteFriend = (event, id) => {
     axios
      .delete(serverRoot + '/friends/' + id)
      .then(res => this.setState({friends: res.data}))
      .catch(error => console.log(error));
 }

  render() {
    return (
      <div className="App">
        <FriendForm submit={this.addNewFriend}/>
          <FriendsList 
            friends={this.state.friends} 
            deleteFriend={this.deleteFriend}
            modifyFriendsList={this.modifyFriendsList}
        ></FriendsList>
        </div>
        );
      }
    }
    // <Route exact to="/x" render={props => {
    // }} />
    
    // <Route to="/friends/:id" render={props => <Friend {...props} />} />
export default App;
