import React, { Component, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import Image from "../Image/Image.js";


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
    	var Images;
    	
    	if(this.state.searched) {
    		const data = this.state.data;
    		console.log(data);
    		
	    	Images = data.map(image => {
	    		if(!image.is_album) {
	    			return (<Image src={image.link} />);
	    		} else {
	    			return (<Image src={image.images[0].link} />);
	    		}
	    	});

    	}
    	
    	console.log(Images);

    	if(this.state.searched) {
    		return (
    			<Fragment>
		         	<SearchBar className='top' onHandleSubmit={this.handleAppSubmit}/>
		         	<div id="imageBoard" >
		         		{Images}
		         	</div>
	         	</Fragment>
      		);
    	} else {
    		return (
	         	<SearchBar className='mid' onHandleSubmit={this.handleAppSubmit}/>
      		);
    	}
    }
  
}