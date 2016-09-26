/**
 * Created by Amir on 26/09/2016.
 */

import React from 'react';
import Search from './Search';

class HomePage extends React.Component {

  render() {
    return (

      <div>

        <h1>Deepend<strong>Ancestry</strong></h1>

        <Search url="./../../data/data_large.json"/>

      </div>

    );
  }

}

HomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomePage;

