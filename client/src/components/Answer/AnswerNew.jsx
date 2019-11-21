import React, {Component} from 'react'
import {Button, Feed, Form, Label, TextArea, Dropdown, Comment} from 'semantic-ui-react'
export const FIELD = 'user{id,email},status{name},answers{id,content},tags{id,name}'

// load noi dung cau hoi, va name
// hien thi text area de tra loi
// submit cau tra loi cho cau hoi
class AnswerNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            record: undefined,
            content: undefined,
            question_id: this.props.match.params["question_id"],
            status_id: 2,
            optionTagArray: [],
            tag_id: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const question_id = this.props.match.params["question_id"]

        fetch(`/api/v1/questions/${question_id}?fields=user{id,email},status{id,name},answers{id,content},tags{id,name}`)
            .then(data => data.json())
            .then(data =>{
                this.setState({
                    record: data,
                })
            })
        fetch('/api/v1/tags')
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
    handleOnAdd = (e, {value}) => {
        const {optionTagArray} = this.state

        const newTag = optionTagArray.find(function (e) {
            if (e.value == value[value.length - 1]){
                return e
            }
        })
        this.setState({
            tag_id: [...this.state.tag_id, newTag]
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
                                  <span>Reply</span>
                              </Comment.Metadata>
                              <Comment.Text>{answer.content}</Comment.Text>
                          </Comment.Content>
                      </Comment>
                  </Comment.Group>
              </div>
            )
        })
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
            .then(tag => {
                this.props.history.push('/answers');
            });
    }
    renderTags = (tags) => {
        return tags.map(tag => {
            return (
              <Label as='a' tag size="tiny" key={tag.id}>{tag.name}</Label>
            )
        })
    }
    renderQuestion = () => {
        const {record} = this.state
        return (
            <div key={record["id"]}>
                <Feed>
                    <Feed.Event>
                        <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                        <Feed.Content>
                            <Feed.Label>Name question: {record.name}</Feed.Label>
                            <Feed.Label>{this.renderTags(record.tags)}</Feed.Label>
                            <Feed.Extra text>
                                {record["content"]}
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>

            </div>
        )
    }

    render() {
        const {record, content, optionTagArray} = this.state
        return(
            <div>
                <h1>Answer question</h1>
                { record && this.renderQuestion()}
                {record && this.renderAnswers(record.answers)}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Dropdown placeholder='Tags'
                                  fluid multiple selection
                                  options={optionTagArray}
                                  onChange={this.handleOnAdd}
                                  style={{marginBottom: 10}}
                        >
                        </Dropdown>
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
export default AnswerNew