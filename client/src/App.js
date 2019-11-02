import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Title from './components/TitleField/Title'
import SearchForm from './components/SearchFormField/SearchForm'
import Saved from './components/Saved/Saved'
import NoMatch from './components/NoMatch'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Title />
        <Switch>
          <Route exact path = '/' component={SearchForm}/>
          <Route exact path = '/saved' component={Saved}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
