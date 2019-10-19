import React, {Component} from 'react';
import {Button, Form} from "semantic-ui-react";

class TagEdit extends Component{
    constructor(props){
        super(props)

        this.state = {
            data: {name: '', description: ''},
            name: '',
            description: '',
        }
        this.handleEdit = this.handleEdit.bind(this)

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
        let data = {post: this.state};
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

    componentWillMount() {
        const id = this.props.match.params.id
        fetch(`/api/v1/tags/${id}`)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    name: data["name"],
                    description: data["description"]

                });
                }
            )
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
            // <h1>{this.state.data["name"]}</h1>
        )
    }
}
export default TagEdit