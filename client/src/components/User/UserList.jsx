import React, { Component } from 'react'
import { Link }                           from 'react-router-dom'
import {Button, Icon, Label, Menu, Table, Pagination} from "semantic-ui-react";

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      records: [],
      activePage: 1,
      totalPages: 50,
    }
  }

  componentDidMount() {
    fetch('/api/v1/users?fields=role{id,name}')
      .then(data => data.json())
      .then(data => {
        this.setState({
          records: data.records
        })
      })
  }


  renderUsers = () => {
    const {records} = this.state
    console.log(records)
    return records.map(record => {
      return (
        <Table.Row key={record["id"]}>
          <Table.Cell>{record["id"]}</Table.Cell>
          <Table.Cell>{record["email"]}</Table.Cell>
          <Table.Cell>{record.role["name"]}</Table.Cell>
          <Table.Cell>
            <Button href={`#/users/edit/${record["id"]}`} >Edit</Button>
          </Table.Cell>

        </Table.Row>
      )
    })
  };

  render() {
    return (
      <div style={{maxWidth: 1000}}>
        <h1>User List</h1>
        <br/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderUsers()}
          </Table.Body>
        </Table>

      </div>
    )
  }
}
export default UserList
