import React, {Component} from 'react'
import {Feed, Pagination, Grid, Button} from "semantic-ui-react";

class AnswerList extends Component{
    constructor(props){
        super(props)
        this.state = {
            records: [],
            activePage: 1,
            totalPages: 50,
            status: [1,2],
            number: 0,
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }

    handlePaginationChange = (e, { activePage }) => {
        const {data} = this.state
        fetch(`/api/v1/questions?fields=user{id,email},status{id,name}&compconds[status_id.in][]=1&page=${activePage}`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records,
                    activePage: activePage,
                    number: data.filters.paging["record_total"],

                })
            })
    };

    componentDidMount() {
        fetch('/api/v1/questions?fields=user{id,email},status{id,name}&compconds[status_id.in][]=1&&compconds[status_id.in][]=2')
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records,
                    number: data.filters.paging["record_total"]
                })
            })
    }

    renderQuestions = () => {
        const {records} = this.state

        return records.map(record => {
            return (
                <div key={record["id"]} style={{marginTop: 10}}>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User style={{marginRight: 10}}>{record.user["email"]}</Feed.User>
                                    <Feed.User>{record["name"]}</Feed.User>
                                    <Feed.Label style={{color: 'green'}}>{record.status["name"]}</Feed.Label>
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {record["content"]}
                                </Feed.Extra>
                                <Feed.Label><Button href={`#/answers/${record["id"]}/new`} size='mini' icon={"pencil alternate"}/></Feed.Label>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </div>
            )
        })
    }

    render() {
        const {activePage, totalPages, number} = this.state
        return(
            <div>
                <h1>Question ToDo List  {number}</h1>
                <div>
                    {this.renderQuestions()}
                    <Pagination defaultActivePage={activePage} totalPages={totalPages} onPageChange={this.handlePaginationChange}/>
                </div>
            </div>

        )
    }
}
export default AnswerList