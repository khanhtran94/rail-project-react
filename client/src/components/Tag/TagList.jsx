import React, { Component } from 'react'
import { Link }                           from 'react-router-dom'
import {Button, Icon, Label, Menu, Table} from "semantic-ui-react";

class TagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
    }

    componentDidMount() {
        fetch('/api/v1/tags')
            .then(tags => tags.json())
            .then(tags => {
                this.setState({
                    tags: tags
                })
            })
    }

    handleDelete (id){
        let token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(`/api/v1/tags/${id}`,
            {method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-Token': token
                }
            }).then((response) => {
                this.deleteTag(id)
        })
    }

    deleteTag(id){
        debugger
        const newTags = this.state.tags.filter((tag) => tag.id !== id)
        this.setState({
            tags: newTags
        })
    }

    renderTags = () => {
        return this.state.tags.map(tag => {
            return (
                <Table.Row key={tag.id}>
                    <Table.Cell>{tag.id}</Table.Cell>
                    <Table.Cell>{tag.name}</Table.Cell>
                    <Table.Cell>{tag.description}</Table.Cell>
                    <Table.Cell>
                        <Button onClick={() => this.handleDelete(tag.id)}>Delete</Button>
                        <Button href={`#/tags/edit/${tag.id}`} >Edit</Button>
                    </Table.Cell>

                </Table.Row>
            )
        })
    };

    render() {
        return (
            <div style={{maxWidth: 1000}}>
                <h1>Tag List</h1>
                <br/>
                <Button href="#/tags/new" primary size='mini'>Add a New Tag</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderTags()}
                    </Table.Body>
                </Table>

            </div>
        )
    }
}
export default TagList
