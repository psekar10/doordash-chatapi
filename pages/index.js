import Head from 'next/head';
import {useState} from 'react';
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const handleButtonClick = () => {
    console.log('inputValue', inputValue);
  }

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
      <IndexContainer>
        <Head>
          <title>ChatAPI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <InputWrapper 
          type="text"
          value={inputValue}
          placeholder="Type your username..."
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <JoinButtonWrapper onClick={handleButtonClick}>Join the DoorDash Chat!</JoinButtonWrapper>
      </IndexContainer>
    </>
  )
}
/**
 * PAGE STYLING 
 */
// Main Container Styling
const IndexContainer = styled.div({
  minHeight:"100vh",
  margin: "0 auto",
  maxWidth: "350px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", 
  alignItems: "center",
})
// Input wrapper styling
const InputWrapper = styled.input({
  padding: "15px 20px",
  marginBottom: "20px",
  width: "100%",
  border: "1px solid lightgray",
  borderRadius: "3px"
})
// Button styling
const JoinButtonWrapper = styled.button({
  padding: "15px",
  background: "red",
  color: "white",
  borderRadius: "3px",
  border: 0,
  cursor: "pointer",
  width: "100%",
})
