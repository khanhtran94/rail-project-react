import React, {Component} from 'react'
import { Input } from 'semantic-ui-react'

class QuestionList extends Component{

    constructor(props){
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        fetch('/api/v1/questions')
            .then(records => records.json())
            .then(records => {
                this.setState({
                    records: records
                })
            })
    }

    renderQuestions = () => {
        console.log(this.state.records)
        // return this.state.questions.map(question => {
        //     console.log(question)
        // })
    }

    render() {
        return (
            <div>
                {this.renderQuestions()}
            </div>
        )
    }
}

export default QuestionList