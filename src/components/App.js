/**
 * Created by Amir on 26/09/2016.
 */

import React, { PropTypes } from 'react';

const App = (props) => {
  return (

  <div className="container">

    <div className="row">

      {props.children}

    </div>

  </div>

  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
