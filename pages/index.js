import Head from 'next/head';
import { useRouter } from 'next/router';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({uname}) => {
    window.localStorage.setItem('uname', uname);
    window.localStorage.setItem('loginTime', Date.now());
    router.push('/room');
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <IndexContainer>
          <Head>
            <title>ChatAPI</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <InputWrapper 
            type="text"
            name="uname"
            {...register("uname", { required: true })}
            placeholder="Type your username..."
          />
          <JoinButtonWrapper type="submit">Join the DoorDash Chat!</JoinButtonWrapper>
          {errors.uname && <span style={{color:"red", marginTop:"10px"}}>Please type in a user name</span>}
        </IndexContainer>
      </form>
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
  background: "#ff1940",
  color: "white",
  borderRadius: "3px",
  border: 0,
  cursor: "pointer",
  width: "100%",
})
