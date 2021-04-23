import Head from 'next/head';
import { useRouter } from 'next/router'
import {useState, useEffect, useRef} from "react";
import styled from '@emotion/styled';
// JS COMPONENTS
import SideBarSection from '../components/Sidebar';
import MainSectionHeader from '../components/MainSectionHeader';
import MainSectionBody from '../components/MainSectionBody';
import MainSectionFooter from '../components/MainSectionFooter';

function RoomPage() {
	const router = useRouter();
	const uname = global.window && global.window.localStorage.getItem('uname');
	const loginTime = global.window && global.window.localStorage.getItem('loginTime');
	// useState Setup
	const [roomDetails, setRoomDetails] = useState([]);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [rooms, setRooms] = useState([]);
	const [minutes, setMinutes] = useState(0)
	const messagesEndRef = useRef(null);
	/**
	 * Scroll to bottom function
	 */
	const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
	/**
	 * Update Online time
	 */
	const updateTime = () => {
		var diff = Math.abs(Date.now() - loginTime);
		var minutes = Math.floor((diff/1000)/60);
		setMinutes(minutes)
	}
	/**
	 * useEffect Call - Redirect to Index page if no uname is set
	 */
	useEffect(()=> {
		if (!uname) {
			router.push('/')
		}
		updateTime();
	}, [uname])
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
				setRooms(result)
			} catch(e) {
				console.error('Error is: ', e);
			}
		}
		getRooms()
	}, [])
	/**
	 * Function to get the messages of the specific room
	 * @param {*} id 
	 */
	async function getRoomMessages(id) {
		let messageResponse = await fetch(`http://localhost:8080/api/rooms/${id}/messages`);
		if (!messageResponse.ok) {
			throw new Error(`HTTP error! status: ${messageResponse.status}`);
		}
		let messageResult = await messageResponse.json();
		if (messageResult.error || messageResult.status === "failed") {
			throw new Error(`Fetch - Update failed. Please check console logs. ${messageResult.error}`);
		}
		setMessages(messageResult);
		updateTime();
	}
	/**
	 * Function to get the details of a specific room
	 * @param {*} id 
	 */
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
	/**
	 * Function to post the messages
	 * @param {*} id 
	 */
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
	/**
	 *  Function to handle Keypress for input in room page
	 */
	const handleKeyPress = (e) => {
		if(e.key === 'Enter'){
			postMessages(roomDetails.id)
		}
	}
	// This is a logic to remove the username from the list. this relects in the MainSection Header details
	if (roomDetails.length !==0 ) {
		const index = roomDetails.users.indexOf(uname);
		if (index > -1) {
			roomDetails.users.splice(index, 1);
		}
	}
  return (
    <>
      <Head>
        <title>ChatAPI | ROOMS</title>
				<link rel="canonical" href="" />
        <meta name="description" content="" />
      </Head>
			<div style={{display:"flex", flexDirection:"row", height:"100vh"}}>
				{/* Side Bar */}
				<SideBarSection 
					uname={uname} 
					rooms={rooms} 
					roomDetails={roomDetails}
					minutes={minutes}
					getRoomDetails={getRoomDetails}
				/>
				<MainSection>
					{/* This section is the main header with the Room Name and the users */}
					<MainSectionHeader 
						uname={uname} 
						roomDetails={roomDetails}
					/>
					{/* This section is the main body with the chat messages */}
					<MainSectionBody 
						uname={uname} 
						messages={messages}
						messagesEndRef={messagesEndRef}
					/>
					{/* This section is the main footer with the input details */}
					<MainSectionFooter
						inputValue={inputValue} 
						setInputValue={setInputValue} 
						roomDetails={roomDetails} 
						handleKeyPress={handleKeyPress}
						postMessages={postMessages}
					/>
				</MainSection>
			</div>
    </>
  );
}

export default RoomPage;

/**
 * STYLING
 */
const MainSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;