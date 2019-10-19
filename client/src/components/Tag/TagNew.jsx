import React, { Component } from 'react'
import {Button, Form} from "semantic-ui-react";

class TagNew extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        let newValue = e.target.value;
        let key = e.target.name;
        this.setState({
            [key]: newValue
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = {post: this.state};
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/tags', {
            method: 'POST',
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

        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: 600}}>
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

export default TagNew