import React, {Component} from 'react'
import {Button, Form, TextArea, Select, Feed, Label, Comment} from "semantic-ui-react";

class QuestionEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            record: undefined,
            content: undefined,
            question_id: this.props.match.params.id,
        }
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        const id = this.props.match.params.id

        fetch(`/api/v1/questions/${id}?fields=user{id,email},status{id,name},answers{id,content},tags{id,name}`)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    record: data,
                })
            })
    }
    renderAnswers = (answers) => {
        return answers.map(answer => {
            return (
                <div key={answer["id"]}>
                    <Comment.Group size="small">
                        <Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
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

    renderQuestions = () => {
        const {record} = this.state
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
                                <Feed.Label>{this.renderTags(record.tags)}</Feed.Label>
                            </Feed.Summary>
                            <Feed.Extra text>
                                {record["content"]}
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
                {this.renderAnswers(record.answers)}
                {record.status["name"] !== 'Done' && <Button size='mini' icon="like" onClick={this.handleConfirm} id={record["id"]}></Button>}
            </div>
        )

    }

    renderTags = (tags) => {
        return tags.map(tag => {
            return (

                <Label as='a' tag size="tiny" key={tag.id}>{tag.name}</Label>
            )
        })
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
        let token = document.querySelector('meta[name="csrf-token"]').content;

        fetch('/api/v1/answers',{
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
          .then(question => {
              window.location.reload();
          });
    }
    // render ra form de submit
    render() {
        const {record, content} = this.state
        return(
            <div>
                <h1>Question</h1>
                {record && this.renderQuestions()}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <TextArea
                          placeholder='Tell us more'
                          onChange={this.handleChange}
                          value={content}
                          name="content"
                        />
                    </Form.Field>
                    <Button type='submit'>Answer</Button>
                </Form>
            </div>
        )
    }
}
export default QuestionEdit