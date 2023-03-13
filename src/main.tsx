import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Fonts from "./Fonts"

const theme = extendTheme({
	fonts: {
		heading: "Montserrat",
		body: "Raleway"
	}
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Fonts />
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
