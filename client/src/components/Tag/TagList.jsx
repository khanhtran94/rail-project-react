import React, { Component } from 'react'
import { Link }                           from 'react-router-dom'
import {Button, Icon, Label, Menu, Table, Pagination} from "semantic-ui-react";
import {FIELD} from "../Question/QuestionList";

class TagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            records: [],
            activePage: 1,
            totalPages: 50,
            current_user: undefined,
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteTag = this.deleteTag.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)

    }

    componentDidMount() {
        fetch('/api/v1/tags')
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records
                })
            })
      fetch('/api/v1/users/check_user')
        .then(data => data.json())
        .then( data => {
          this.setState({
            current_user: data
          })
        })

    }

    handlePaginationChange = (e, { activePage }) => {
        const {data} = this.state
        fetch(`/api/v1/tags?page=${activePage}`)
          .then(data => data.json())
          .then(data => {
              this.setState({
                  records: data.records,
                  activePage: activePage,
              })
          })
    };

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
          .then(question => {
              window.location.reload();

          });
    }

    deleteTag(id){
        const newTags = this.state.tags.filter((tag) => tag.id !== id)
        this.setState({
            tags: newTags
        })
    }

    renderTags = () => {
        const {records, current_user} = this.state
        console.log(records)
        return records.map(record => {
            return (
                <Table.Row key={record["id"]}>
                    <Table.Cell>{record["id"]}</Table.Cell>
                    <Table.Cell>{record["name"]}</Table.Cell>
                    <Table.Cell>{record["description"]}</Table.Cell>
                  {current_user && current_user["role"] == 2 &&
                    <Table.Cell>
                      <Button onClick={() => this.handleDelete(record["id"])}>Delete</Button>
                      <Button href={`#/tags/edit/${record["id"]}`}>Edit</Button>
                    </Table.Cell>
                  }
                </Table.Row>
            )
        })
    };

    render() {
        const {activePage, totalPages, current_user} = this.state

        return (
            <div style={{maxWidth: 1000}}>
                <h1>Tag List</h1>
                <br/>
              {current_user && current_user["role"] == 2 && <Button href="#/tags/new" primary size='mini'>Add a New Tag</Button>}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                          {current_user && current_user["role"] == 2 && <Table.HeaderCell>Action</Table.HeaderCell>}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderTags()}
                    </Table.Body>
                </Table>
                <Pagination defaultActivePage={activePage} totalPages={totalPages} onPageChange={this.handlePaginationChange}/>

            </div>
        )
    }
}
export default TagList
