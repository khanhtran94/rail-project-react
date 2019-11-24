import React, {Component} from 'react';
import {Button, Form, Select} from "semantic-ui-react";

class UserEdit extends Component{
  constructor(props){
    super(props)

    this.state = {
      record: undefined,
      optionRoleArray: [],
    }
    this.handleEdit = this.handleEdit.bind(this)

  }
  componentDidMount() {
    const id = this.props.match.params.id

    fetch(`/api/v1/users/${id}?fields=role{id,name}`)
      .then((response) => response.json())
      .then(data => {
        this.setState({
          record: data,
        })
      })
    fetch('/api/v1/roles')
      .then(data => data.json())
      .then(data => {
        const existingRole = []
        data.records.map(role => existingRole.push({id: role.id, value: role.id,  text: role.name}))
        this.setState({
          optionRoleArray: existingRole
        })
      })


  }

  handleChange = e => {
    let newValue = e.target.value;
    let key = e.target.name;
    this.setState({
      [key]: newValue
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      redirect: "error",
      body: JSON.stringify(this.state)
    })
      .then(resp => {
        resp.json()
      })
      .then(user => {
        this.props.history.push('/users');
      });
  }

  handleOnAdd = (e, {value}) => {
    const {optionRoleArray} = this.state

    this.setState({
      role_id: value
    })
  }


  render() {
    const {record, role_id, optionRoleArray} = this.state
    debugger
    return(
      <div>

      { record && <Form onSubmit={this.handleEdit} style={{maxWidth: 600}}>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email'
                 name='email'
                 value={record.email}
                 disabled={true}
          />
        </Form.Field>

        <Form.Field>
          <label>Role</label>
          <Select placeholder='Role'
                  name='role'
                  defaultValue={record.role_id}
                  options={optionRoleArray}
                  onChange={this.handleOnAdd}
          />
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
      }
      </div>
    )
  }
}
export default UserEdit