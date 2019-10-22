import React, {Component} from 'react'
import { Input, Grid, Segment,Wrapper } from 'semantic-ui-react'

class QuestionList extends Component{

    constructor(props){
        super(props);
        this.state = {
            records: []
        }
    }

    componentDidMount() {
        fetch('/api/v1/questions?fields=user{id,email},status{id,name}')
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records
                })
            })
    }

    renderQuestions = () => {
        const {records} = this.state

        return records.map(record => {
            return (
                <div key={record["id"]}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p>id: {record["id"]}</p>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <p>name: {record["name"]}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p>Status: {record.status["name"]}</p>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <p>Email: {record.user["email"]}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={10}>
                                <p>content: {record["content"]}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </div>
            )
        })
    }

    render() {
        const {records} = this.state
        return (
            <div>
                {this.renderQuestions()}
                {/*<p>{JSON.stringify(records)}</p>*/}
            </div>
        )
    }
}

export default QuestionList