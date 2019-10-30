import React from 'react';

import Navbar from './components/Navbar/Navbar'
import Title from './components/TitleField/Title'

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Title />
      </>
    );
  }
}

export default App;
