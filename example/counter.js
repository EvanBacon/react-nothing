'use strict';
const React = require('react');
const {render, Color} = require('..');

const Counter = () => {
	const [counter, setCounter] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prevCounter => prevCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	});

	return (
		<div>{counter} times nothing happened</div>
	);
};

render(<Counter/>);
