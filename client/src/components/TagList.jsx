import React, { Component }               from 'react'
import { Link }                           from 'react-router-dom'

class TagList extends Component {

    state = {
        tags: []
    }

    componentDidMount() {
        fetch('/api/v1/tags')
            .then(tags => tags.json())
            .then(tags => {
                this.setState({
                    tags: tags
                })
            })
    }

    renderTags = () => {
        return this.state.tags.map(tag => {
            return (
                <div key={tag.id}>
                    {tag.id} - {tag.name}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                TagList Component
                {this.renderTags()}
                <Link to="/tags/new">Add a New Tag</Link>
            </div>
        )
    }
}

export default TagList
