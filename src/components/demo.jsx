import React, { Component } from 'react'

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFiltered: false
        };
    }
    toggleFilter = () => {
        this.setState({
            isFiltered: !this.state.isFiltered
        });
        this.filterData();
    };
    
    filterData = () => {
        // this.state.isFiltered should be true, but it's not
        if (this.state.isFiltered) {
            // Do some filtering
            console.log("Do something")
        }
    };

    render() {
        return (
            <div>
                <input name="foo" onChange={this.toggleFilter} />
                <input name="bar" onChange={this.toggleFilter} />   
            </div>
        )
    }
}
