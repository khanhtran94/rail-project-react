import React, {Component} from 'react'
import { Grid, Button, Feed,Pagination} from 'semantic-ui-react'

class QuestionList extends Component{

    constructor(props){
        super(props);
        this.state = {
            records: [],
            activePage: 1,
            totalPages: 50,
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
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

    handlePaginationChange = (e, { activePage }) => {
        const {data} = this.state
        fetch(`/api/v1/questions?fields=user{id,email},status{id,name}&page=${activePage}`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    records: data.records,
                    activePage: activePage,
                })
            })
        };


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
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
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