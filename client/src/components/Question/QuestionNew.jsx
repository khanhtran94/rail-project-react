import React, {Component} from 'react'
import {Button, Form, TextArea,Select} from "semantic-ui-react";

class  QuestionNew extends Component{
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            name: '',
            status_id: 1,
            tag_id: [],
            optionTagArray: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this),
        this.handleOnAdd = this.handleOnAdd.bind(this)
    }

    componentDidMount() {
        fetch('/api/v1/tags')
            .then(data => data.json())
            .then(data => {
                const existingTag = []
                data.records.map(tag => existingTag.push({key: tag.id, value: tag.name,  text: tag.name}))
                this.setState({
                    optionTagArray: existingTag
                })
            })
    }

    handleChange = (e) => {
        let newValue = e.target.value;
        let key = e.target.name;
        this.setState({
            [key]: newValue
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/questions', {
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
                this.props.history.push('/questions');
            });
    }

    handleOnAdd = (e, {value}) => {
        const {optionTagArray} = this.state
        // duyet toan bo value, day vao 1 mang, su dung for cho optionTagArray, value.each tim tung phan tu cua value, day vao 1 array, luu vao state
        const newTag = optionTagArray.find(function (e) {
            if (e.value == value[value.length - 1]){
                return e
            }
        })
        this.setState({
            tag_id: [...this.state.tag_id, newTag]
        })
    }

    render() {
        const {content, name, tag_id, optionTagArray} = this.state

        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: 600}}>
                <Form.Field>
                    <Select placeholder='Tags'
                              fluid multiple selection
                              options={optionTagArray}
                              onChange={this.handleOnAdd}
                    >
                    </Select>
                </Form.Field>
                <Form.Field>
                    <label>Name:</label>
                    <input
                        placeholder={'Name question'}
                        name='name'
                        value={name}
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Name:</label>
                    <TextArea
                        placeholder={'Content question'}
                        name='content'
                        value={content}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }

}

export default QuestionNew