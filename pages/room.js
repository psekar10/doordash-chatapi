import Head from 'next/head';
import { useRouter } from 'next/router'
import {useState, useEffect, useRef} from "react";
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import SideBarSection from '../components/Sidebar';
import MainSectionHeader from '../components/MainSectionHeader';
import MainSectionBody from '../components/MainSectionBody';
import MainSectionFooter from '../components/MainSectionFooter';

function RoomPage() {
	const router = useRouter();
	const uname = router.query.uname;
	// useState Setup
	const [roomDetails, setRoomDetails] = useState([]);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [rooms, setRooms] = useState([]);
	const messagesEndRef = useRef(null);
	/**
	 * Scroll to bottom function
	 */
	const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
	/**
	 * useEffect Call - Scroll to the bottom 
	 */
  useEffect(() => {
    scrollToBottom()
  }, [messages]);
	/**
	 * useEffect Call - Update the messages every 5 secs
	 */
  useEffect(() => {
		let intervalID;
		if (roomDetails.length !== 0) {
			intervalID = (window.setInterval(getRoomMessages, 5000, roomDetails.id));
		}
		return () => {
			clearInterval(intervalID)
		}
  }, [roomDetails]);
	/**
	 * useEffect - to get the rooms
	 */
	useEffect(() => {
		async function getRooms() {
			try {
				let response = await fetch('http://localhost:8080/api/rooms');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				let result = await response.json();
				if (result.error || result.status === "failed") {
					throw new Error(`Fetch - Update failed. Please check console logs. ${result.error}`);
				}
				console.log('result', result)
				setRooms(result)
			} catch(e) {
				console.error('Error is: ', e);
			}
		}
		getRooms()
	}, [])
	async function getRoomMessages(id) {
		let messageResponse = await fetch(`http://localhost:8080/api/rooms/${id}/messages`);
		if (!messageResponse.ok) {
			throw new Error(`HTTP error! status: ${messageResponse.status}`);
		}
		let messageResult = await messageResponse.json();
		if (messageResult.error || messageResult.status === "failed") {
			throw new Error(`Fetch - Update failed. Please check console logs. ${messageResult.error}`);
		}
		setMessages(messageResult)
	}
	async function getRoomDetails(id) {
		try {
			let response = await fetch(`http://localhost:8080/api/rooms/${id}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			let result = await response.json();
			if (result.error || result.status === "failed") {
				throw new Error(`Fetch - Update failed. Please check console logs. ${result.error}`);
			}
			setRoomDetails(result);
			getRoomMessages(id);
		} catch(e) {
			console.error(e);
		}
	}
	async function postMessages(id) {
		// Headers
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		// Request Options
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				name:	uname,
				message: inputValue
			}),
			redirect: 'follow'
		};
		try {
			let response = await fetch(`http://localhost:8080/api/rooms/${id}/messages`, requestOptions);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			let result = await response.json();
			if (result.error || result.status === "failed") {
				throw new Error(`Fetch - Update failed. Please check console logs. ${result.error}`);
			}
			setMessages(messages => messages.concat([{name:	uname, message: inputValue}]));
		} catch(e) {
			console.error('Error is: ', e);
		} finally {
			setInputValue('');
		}
	}
	if (roomDetails.length !==0 ) {
		const index = roomDetails.users.indexOf(uname);
		if (index > -1) {
			roomDetails.users.splice(index, 1);
		}
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
						overflow: hidden;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Head>
        <title>ROOMS</title>
      </Head>
			<div style={{display:"flex", flexDirection:"row", height:"100vh"}}>
				<SideBarSection 
					uname={uname} 
					rooms={rooms} 
					roomDetails={roomDetails}
					getRoomDetails={getRoomDetails}
				/>
				<MainSection>
					<MainSectionHeader 
						uname={uname} 
						roomDetails={roomDetails}
					/>
					<MainSectionBody 
						uname={uname} 
						messages={messages}
						messagesEndRef={messagesEndRef}
					/>
					<MainSectionFooter
						inputValue={inputValue} 
						setInputValue={setInputValue} 
						roomDetails={roomDetails} 
						postMessages={postMessages}
					/>
				</MainSection>
			</div>
    </>
  );
}

export default RoomPage;

const MainSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;