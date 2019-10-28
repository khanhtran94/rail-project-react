import React, {Component} from 'react'
import { Button, Feed, Form, TextArea } from 'semantic-ui-react'

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
            status_id: 2
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const question_id = this.props.match.params["question_id"]

        fetch(`/api/v1/questions/${question_id}`)
            .then(data => data.json())
            .then(data =>{
                this.setState({
                    record: data,
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

    renderAnswer = () => {
        const {record} = this.state
        return (
            <div key={record["id"]}>
                <Feed>
                    <Feed.Event>
                        <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                        <Feed.Content>
                            <Feed.Label>Name question: {record.name}</Feed.Label>
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
        const {record, content} = this.state
        return(
            <div>
                <h1>Answer question</h1>
                { record && this.renderAnswer()}
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
export default AnswerNew