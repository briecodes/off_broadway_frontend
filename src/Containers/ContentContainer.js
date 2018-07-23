import React, { Component } from 'react';

import AllProductionsContainer from './AllProductionsContainer';
import CreateContainer from './CreateContainer';
import MyProductions from '../Components/MyProductions';
import Home from '../Components/Home';
import ARpage from '../Components/AR';

const URL = 'https://mod-4-backend.herokuapp.com/api/v1/'
// const URL = 'http://localhost:3000/api/v1/'

class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productions: [],
      myProductions: [],
      viewProduction: null
    };
  };

  componentDidMount() {
    this.fetchProductionData();
    this.fetchActorData();
  };

  fetchProductionData = () => {
    fetch(URL + 'productions',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => response.json()).then(productions => {
      this.setState({
        productions
      });
    }).then(() => {
      this.myProductions();
    });
  };

  fetchActorData = () => {
    fetch(URL + 'actors', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(actors => {
        this.setState({
          actors
        });
      });
  };

  myProductions = () => {
    const myProductions = []
    this.state.productions.forEach(production => {
      if (production.user_id === this.props.userId){
        return myProductions.push(production);
      }else{
        return;
      }
    });
    this.setState({
      myProductions
    });
  };

  seeTheShow = (viewProduction) => {
    this.props.onClickHandler('view production');
    this.setState({
      viewProduction
    });
  };

  setViewProduction = (viewProduction) => {
    this.setState({
      viewProduction,
      myProductions: [...this.state.myProductions, viewProduction],
      productions: [...this.state.productions, viewProduction]
    });
    // console.log("View Production", this.state.viewProduction);
    // console.log("In View Production, myProductions", this.state.myProductions);
    this.props.onClickHandler('my productions')
  };

  render() {
    return (
      <React.Fragment>
        {this.props.page === '/' ? <Home/> : null}
        {this.props.page === 'view production' ? <ARpage show={this.state.viewProduction}/> : null}
        {this.props.page === 'all productions' ? <AllProductionsContainer allProductions={this.state.productions} handleViewProductionClick={this.seeTheShow}/> : null}
        {this.props.page === 'new production' ? <CreateContainer actors={this.state.actors} setViewProduction={this.setViewProduction}/> : null}
        {this.props.page === 'my productions' ? <MyProductions myProductions={this.state.myProductions} handleViewProductionClick={this.seeTheShow}/> : null}
      </React.Fragment>
    );
  };
};

export default ContentContainer;
