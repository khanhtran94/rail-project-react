import React, {Component} from 'react'
import {Feed, Pagination, Grid, Button, Comment} from "semantic-ui-react";

export const FIELD = 'user{id,email},status{id,name},tags{id,name},answers{id,content}'

class AnswerList extends Component{
    constructor(props){
        super(props)
        this.state = {
            records: [],
            activePage: 1,
            totalPages: 50,
            status: [1,2],
            number: 0,
            current_user: undefined,
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }

    handlePaginationChange = (e, { activePage }) => {
        const {data} = this.state
        fetch(`/api/v1/questions?fields=${FIELD}&compconds[status_id.in][]=1&&compconds[status_id.in][]=2&page=${activePage}`)
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
        fetch(`/api/v1/questions?fields=${FIELD}&compconds[status_id.in][]=1&&compconds[status_id.in][]=2`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records,
                    number: data.filters.paging["record_total"]
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
                    {this.renderAnswers(record.answers)}
                </div>
            )
        })
    }

    renderAnswers = (answers) => {
        return answers.map(answer => {
            return (
              <div key={answer["id"]}>
                  <Comment.Group size="small">
                      <Comment>
                          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>
                          <Comment.Content>
                              <Comment.Metadata>
                                  <span>Answer</span>
                              </Comment.Metadata>
                              <Comment.Text>{answer.content}</Comment.Text>
                          </Comment.Content>
                      </Comment>
                  </Comment.Group>
              </div>
            )
        })
    }

    render() {
        const {activePage, totalPages, number, current_user} = this.state
        console.log(current_user)
        debugger
        return(
            <div>
                {current_user && current_user["role_id"] == 2 && <h1>Question ToDo List  {number}</h1>}
                { current_user && current_user["role_id"] == 2 && <div>
                    {this.renderQuestions()}
                    <Pagination defaultActivePage={activePage} totalPages={totalPages} onPageChange={this.handlePaginationChange}/>
                </div>}
            </div>

        )
    }
}
export default AnswerList