import React, { Component, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import ImageBoard from "../ImageBoard/ImageBoard.js";
import "./App.css";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
        	searched: false,
        	loading: false,
        	data: [],
        	sort:'',
        	window:'',
        	page: 0
        };
        
        this.handleAppSubmit = this.handleAppSubmit.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
    }
    
    
    handleAppSubmit(value, sort, window, page = 0) {
    	
		this.setState({loading: true});
        const url = "https://api.imgur.com/3/gallery/search/"+sort+"/"+window+"/"+page + "?q=" + value;
        
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Client-ID b067d5cb828ec5a"
            }
        })
        .then(resp => resp.json())
        .then((obj) => {
            if(obj.status == 200) {
            	let newDataState = this.state.data;
            	newDataState.push(obj.data);
            	
	            this.setState({
	            	data: newDataState,
	            	sort: sort,
	            	window: window,
	            	page: page,
	            	value: value,
	            	loading: false
	            });
	            if(!this.state.searched) this.setState({searched: true});
	        } else {
		    	console.log("Error Request");
		    }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    isBottom(e) {
		return e.getBoundingClientRect().bottom <= window.innerHeight + 150;
	}
    
    trackScrolling() {
		const app = document.getElementById('app');
		if (this.isBottom(app) && !this.state.loading) {
			const { page, sort, value, window } = this.state;
			this.setState({page: page + 1});
			this.handleAppSubmit(value, sort, window, page + 1);
			console.log('making gains');
		}
	}
    
    componentDidMount() {
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}

    render() {
    	if(this.state.searched) {
    		const { data } = this.state;
    		const ImageBoards = data.map((imboard, i) => {
    			return (<ImageBoard data={imboard} key={i}/>)
    		});
    		
    		return (
    			<div id="app">
		         	<SearchBar className='top' onHandleSubmit={this.handleAppSubmit}/>
		         	{ImageBoards}
	         	</div>
      		);
    	} else {
    		return (
	         	<SearchBar className='mid' onHandleSubmit={this.handleAppSubmit}/>
      		);
    	}
    }
  
}