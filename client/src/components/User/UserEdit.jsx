import React, {Component} from 'react';
import {Button, Form} from "semantic-ui-react";

class UserEdit extends Component{
  constructor(props){
    super(props)

    this.state = {
      record: undefined,
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
        const existingTag = []
        data.records.map(tag => existingTag.push({id: tag.id, value: tag.name,  text: tag.name}))
        this.setState({
          optionTagArray: existingTag
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
    fetch(`/api/v1/tags/${id}`, {
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
      .then(tag => {
        this.props.history.push('/tags');
      });
  }


  render() {
    const {name, description} = this.state
    console.log(name)
    console.log(description)
    return(
      <Form onSubmit={this.handleEdit} style={{maxWidth: 600}}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name Tag'
                 name='name'
                 value={name}
                 onChange={this.handleChange}

          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input placeholder='Description Tag'
                 name='description'
                 value={description}
                 onChange={this.handleChange}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
export default UserEdit