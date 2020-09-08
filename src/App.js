import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './container/main'
import { connect } from 'react-redux';

function App({dogs}) {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    rendered: () => dispatch({ type: 'RENDERED' }),
  }
} 
const mapStateToProps = state => {
  return {
    dogs: state.dogs
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
