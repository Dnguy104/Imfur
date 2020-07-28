import React, { Fragment } from "react";
import Image from "../Image/Image.js";
import "./ImageBoard.css";


export default function Imageboard(props) {
	const data = props.data;
		
	const Images = data.filter(image => {
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
		return (<Image src={image.link} title={title} key={i} id={i}/>)
	});
    	

	return(
		<div id="imageBoard" >
     		{Images}
     	</div>
	);
}