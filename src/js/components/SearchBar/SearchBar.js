import React, { Component } from "react";
import "./Searchbar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSubmit()
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
    }
    
    handleSubmit() {
        const { value } = this.state;
        this.props.onHandleSubmit(value);
    }


    render() {
        return (
            <section className="section">
                <input
                    type="text"
                    id="addInput"
                    placeholder="Images!"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button className="button" onClick={this.handleSubmit}>
                    Add Item
                </button>
          </section>
        );
    }
}
