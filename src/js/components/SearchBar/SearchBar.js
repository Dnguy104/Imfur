import React, { Component } from "react";
import "./Searchbar.css";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            sort: 'time',
            window: 'all',
            windowtoggle: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleWindow = this.handleWindow.bind(this);
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
    
    handleSort(e) {
        if(e.target.value == "top") {
            this.setState({
                sort: e.target.value,
                windowtoggle: !this.state.windowtoggle
            });
        } else {
            this.setState({
                sort: e.target.value,
                window: "all",
                windowtoggle: false
            });
            if(this.state.value) {
                this.handleSubmit();
            }
        }
    }
    
    handleWindow(e) {
        this.setState({
            window: e.target.value,
            windowtoggle: false
        });
        if(this.state.value) {
            this.handleSubmit();
        }
    }
    
    handleSubmit() {
        const { value, sort, window } = this.state;
        this.props.onHandleSubmit(value, sort, window);
    }


    render() {
        const { windowtoggle } = this.state;
        
        return (
            <section className="section" id={this.props.position}>
                {this.props.position == "mid" ? (<h1>Imfur!</h1>) : null}
                <input
                    type="text"
                    id="addInput"
                    placeholder="Images!"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button className="button" onClick={this.handleSubmit}>
                    Enter
                </button>
                <br/>
                <div className="btn-group btn-group-sm" data-toggle="dropdown" onClick={this.handleSort}>
                    <button value="time" type="button" className="btn btn-secondary ">Time</button>
                    <button value="viral" type="button" className="btn btn-secondary">Viral</button>
                    <button value="top" type="button" className ="btn btn-secondary">Top</button>
                </div>
                {
                    windowtoggle ?
                    (<div className="btn-group btn-group-sm" data-toggle="dropdown" onClick={this.handleWindow}>
                        <button value="day" type="button" className="btn btn-secondary">Day</button>
                        <button value="week" type="button" className="btn btn-secondary">Week</button>
                        <button value="month" type="button" className ="btn btn-secondary">Month</button>
                        <button value="year" type="button" className="btn btn-secondary">Year</button>
                        <button value="all" type="button" className ="btn btn-secondary">All</button>
                    </div>)
                    : null    
                }
          </section>
        );
    }
}
