import React, {Component} from 'react'
import { Grid, Button, Feed,Pagination, Comment, Label} from 'semantic-ui-react'

export const FIELD = 'user{id,email},status{name},answers{id,content},tags{id,name}'

class QuestionList extends Component{
    constructor(props){
        super(props);
        this.state = {
            records: [],
            activePage: 1,
            totalPages: 50,
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    componentDidMount() {
        fetch(`/api/v1/questions?fields=${FIELD}`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records
                })
            })
    }

    handleConfirm = (e, {key}) => {
        e.preventDefault();

        let token = document.querySelector('meta[name="csrf-token"]').content;
        const id = e.currentTarget.id

        fetch(`/api/v1/questions/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': token
            },
            redirect: "error",
            body: JSON.stringify({status_id: 3, id: id})
        })
            .then(resp => {
                resp.json()
            })
            .then(question => {
                window.location.reload();

            });
    }

    handlePaginationChange = (e, { activePage }) => {
        const {data} = this.state
        fetch(`/api/v1/questions?fields=${FIELD}&page=${activePage}`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records,
                    activePage: activePage,
                })
            })
        };

    renderTags = (tags) => {
        return tags.map(tag => {
            return (

                <Label as='a' tag size="tiny" key={tag.id}>{tag.name}</Label>
            )
        })
    }


    renderQuestions = () => {
        const {records} = this.state
        console.log(records)
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
                                    <Feed.Label>{this.renderTags(record.tags)}</Feed.Label>
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {record["content"]}
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                    {this.renderAnswers(record.answers)}
                    <Button size='mini' icon="arrow alternate circle right outline" href={`#/questions/edit/${record["id"]}`}  id={record["id"]}></Button>
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
                                    {/*<span>Answer</span>*/}
                                </Comment.Metadata>
                                {answer.content && answer.content.includes("edit") ? <Comment.Text><a href={answer.content}>Link Answer</a></Comment.Text> : <Comment.Text>{answer.content}</Comment.Text>}
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </div>
            )
        })
    }

    render() {
        const {records, activePage, totalPages} = this.state
        return (
            <div>
                <Grid.Column style={{marginTop: 15}}>
                    <Button href="#/questions/new" primary size='mini' content={'New Question'} icon="add"/>
                </Grid.Column>
                <div>
                    {this.renderQuestions()}
                    <Pagination defaultActivePage={activePage} totalPages={totalPages} onPageChange={this.handlePaginationChange}/>
                </div>
                {/*<p>{JSON.stringify(records)}</p>*/}
            </div>
        )
    }
}

export default QuestionList