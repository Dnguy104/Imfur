import React, { Component, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import Image from "../Image/Image.js";
import "./App.css";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
        	searched: false,
        	data: []
        };
        
        this.handleAppSubmit = this.handleAppSubmit.bind(this);
    }
    
    
    handleAppSubmit(value) {
        const url = "https://api.imgur.com/3/gallery/search/" + "?q=" + value;
        
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Client-ID b067d5cb828ec5a"
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.status == 200) {
	            this.setState({data: data.data});
	            if(!this.state.searched) this.setState({searched: true});
	        } else {
		    	console.log("Error Request");
		    }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
    	let Images;
    	
    	if(this.state.searched) {
    		const data = this.state.data;
    		console.log(data);
    		
	    	Images = data.filter(image => {
	    		if(image.is_album) {
	    			image = image.images[0];
	    		} 
	    		if(image.animated) {
	    			return false;
	    		}
	    		return true;
	    	}).map((image, i) => {
	    		const title = image.title;
	    		if(image.is_album) {
	    			image = image.images[0];
	    		} 
	    		return (<Image src={image.link} title={title} key={i}/>)
	    	});
	    	
	    	console.log(Images);
    	}
    	

    	if(this.state.searched) {
    		return (
    			<div id="app">
		         	<SearchBar className='top' onHandleSubmit={this.handleAppSubmit}/>
		         	<div id="imageBoard" >
		         		{Images}
		         	</div>
	         	</div>
      		);
    	} else {
    		return (
	         	<SearchBar className='mid' onHandleSubmit={this.handleAppSubmit}/>
      		);
    	}
    }
  
}