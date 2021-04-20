import Head from "next/head"
import React from "react";
import { Global, css } from '@emotion/react'

function MyApp({ Component, pageProps }) {
  return (
	<>
		<Global
			styles={css`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}
		/>
		<Component {...pageProps} />
	</>
	)
}

export default MyApp;
