

import React from 'react';

import { Table } from 'react-bootstrap';

import Admin from './Admin';
import Employee from './Employee';
import Manager from './Manager';
import 'bootstrap/dist/css/bootstrap.min.css';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      Data: [],
    };
    if (localStorage.type === "Admin") this.url = "http://localhost:5000/users";
    else this.url = "http://localhost:5000/customer";
  }

  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.token,
      edit: localStorage.edit,
      type: localStorage.type,
    };
    fetch(this.url, { headers })
      .then((response) => response.json())
      .then((data) => this.setState({ Data: data }));
  }
  refreshPage = () => {
    window.location.reload(false);
  };
  edit = () => {
    if (localStorage.type === "Manager") return <Manager />;
    else if (localStorage.type === "Admin") return <Admin />;
    else if (localStorage.type === "Employee") return <Employee />;
    return <h3>Has No Rights to Edit</h3>;
  };
  render() {
    if (localStorage.token !== undefined) {
      if (this.state.Data.length > 0) {
        if (localStorage.edit === "true")
          return (
            <div style={{ width: "100%" }}>
              <div>
                <Table
                  striped
                  bordered
                  hover
                  style={{ width: "flex-warp", fontSize: "12px" }}
                >
                  <thead>
                    <tr>
                      {Object.keys(this.state.Data[0]).map((key) => (
                        <td>{key}</td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Data.map((detail, index) => (
                      <tr key={index}>
                        {Object.values(detail).map((value) => {
                          return <td>{value}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <h1>EDIT</h1>
                {this.edit()}
              </div>
            </div>
          );
        return (
          <div>
            <Table
              striped
              bordered
              hover
              style={{ width: "90%", fontSize: "12px" }}
            >
              <thead>
                <tr>
                  {Object.keys(this.state.Data[0]).map((key) => (
                    <th>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.Data.map((detail, index) => (
                  <tr key={index}>
                    {Object.values(detail).map((value, i) => {
                      return <td key={i}>{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      }
  
      return <h1>Loading...</h1>;
    }
    return <h1>Please Login..!!</h1>;
  }
  
}

export default Home;
