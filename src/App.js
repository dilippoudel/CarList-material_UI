import React, { Component } from 'react';
import CarList from './components/CarList'





const Main = () => {
  return (
  <main className = "container">
  <App/>
</main>)
}



class App extends Component {
  render() {
    return (
      <CarList/>
    );
  }
}

export default Main;