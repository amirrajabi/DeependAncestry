/**
 * Created by Amir on 26/09/2016.
 */

import React from 'react';
import $ from "jquery";
import {IndexLink} from 'react-router';

let runSearch =  function(event) {

  event.preventDefault();

  $.ajax({
    url: this.state.url,
    dataType: 'json',
    cache: false,
    success: function (data) {
      let tableRow = 0,
        dataName = '',
        dataGender = '',
        stateName = this.state.name.toLowerCase(),
        resultList = [];

      data.people.map((item) => {
        dataName = item.name.toLowerCase();
        dataGender = item.gender;

        if (tableRow < this.state.tableRow) {

          if (this.state.male && dataName.indexOf(stateName) != -1 && dataGender === "M") {
            tableRow++;
            resultList.push(item);
          }

          if (this.state.female && dataName.indexOf(stateName) != -1 && dataGender === "F") {
            tableRow++;
            resultList.push(item);
          }

          if (!this.state.male && !this.state.female && dataName.indexOf(stateName) != -1) {
            tableRow++;
            resultList.push(item);
          }
        }

      });

      resultList.length ? this.state.showResults = true : this.state.showResults = false;

      this.setState({places: data.places});
      this.setState({people: resultList});
      this.setState({name: ''});
    }.bind(this),
    error: function (err) {
      console.error(err.toString());
    }.bind(this)
  });

};

let handleNameChange = function (e) {
  this.setState({
    name: e.target.value
  });
};

let handleMaleChange = function () {
  this.setState({
    male: !this.state.male
  });
};

let handleFemaleChange = function () {
  this.setState({
    female: !this.state.female
  });
};

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      people: [],
      name: '',
      male: false,
      female: false,
      showResults: false,
      tableRow: 10,
      url: this.props.url,
    };
  }

  getPlace() {
    let birthPlace = '';
    this.state.places.map((item) => {
      if (arguments[0] === item.id) {
        birthPlace = item.name;
      }
    });
    return birthPlace;
  }

  render() {

    let resultsTableRow = this.state.people.map((item) => {
      return (
        <tr key={item.id}>
          <td>{ item.id }</td>
          <td>{ item.name }</td>
          <td>{ item.gender === "M" ? "Male" : "Female" }</td>
          <td>{ this.getPlace(item['place_id']) }</td>
        </tr>
      );
    });

    return (
      <div className="search">

        <form className="row"
              onSubmit={runSearch.bind(this)}>

          <section className="input-side col-sm-7">

            <div className="form-group">

              <input type="text"
                     value={this.state.name}
                     className="form-control"
                     placeholder="Name"
                     onChange={handleNameChange.bind(this)}
                     required/>
            </div>

            <div className="checkbox">
              <label>

                <span className="gender">
                  Gender:
                </span>

                <label className="checkbox-inline">
                  <input type="checkbox"
                         defaultChecked={this.state.male}
                         onChange={handleMaleChange.bind(this)}/> Male
                </label>

                <label className="checkbox-inline">
                  <input type="checkbox"
                         defaultChecked={this.state.female}
                         onChange={handleFemaleChange.bind(this)}/> Female
                </label>

              </label>
            </div>

          </section>

          <section className="search-side col-sm-5">

            <button type="submit"
                    className="btn btn-default">Search</button>

            <IndexLink className="advance-link"
                       to="/advance-search">Advance Search</IndexLink>

          </section>

        </form>

        {this.state.showResults ? <section>

          <h3>Result: </h3>

          <table className="table table-striped">
            <thead>

            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>GENDER</th>
              <th>BIRTHPLACE</th>
            </tr>

            </thead>

            <tbody>
            {resultsTableRow}
            </tbody>

          </table>
        </section> : null}

      </div>
    );

  }

}

export default Search;
