import React, { Component }               from 'react'

class TagNew extends Component {

    state = {
        name: '',
        description: ''
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
        let data = {post: this.state};
        let token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('api/v1/tags', {
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
                this.props.history.push('/tags');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={this.handleChange} />
                </p>
                <p>
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
                </p>
                <input type="submit" value="Create Post" />
            </form>
        )
    }
}

export default TagNew