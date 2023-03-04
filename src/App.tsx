import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(50);
	const [toggler, setToggler] = useState(false);

	// This would update the counter
	useEffect(() => {
		if (toggler) {
			const initTimer = setInterval(() => {
				const updateData = count + 1;
				updateData >= 60 ? setCount(0) : setCount(updateData);
			}, 1000);

			return () => clearInterval(initTimer);
		}
	}, [count, toggler]);

	return (
		<div className="App">
			<h1> {count}</h1>
			<button onClick={() => setToggler(!toggler)}>
				{toggler ? "Stop" : "Start"}
			</button>
		</div>
	);
}

export default App;
