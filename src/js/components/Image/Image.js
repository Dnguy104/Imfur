import React, { Fragment } from 'react';
import "./Image.css";

export default function Image(props) {

	return(
		<div id="iimage">
			<img src={props.src} />
		</div>
	);
}