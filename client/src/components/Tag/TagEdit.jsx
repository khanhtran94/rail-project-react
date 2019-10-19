import React, {Component} from 'react';
import {Button, Form} from "semantic-ui-react";

class TagEdit extends Component{
    constructor(props){
        super(props)

        this.state = {
            data: {name: '', description: ''},
        }

    }

    componentWillMount() {
        const id = this.props.match.params.id
        fetch(`/api/v1/tags/${id}`)
            .then((response) => response.json())
            .then(data => {
                this.setState({data});
                }
            )
    }

    render() {
        const {data} = this.state

        return(
            <h1>{this.state.data["name"]}</h1>
        )
    }
}
export default TagEdit