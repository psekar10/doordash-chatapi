import Head from 'next/head';
import { useRouter } from 'next/router'
import {useState, useEffect} from "react";
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import ChatFinder from '../../assets/chatfinder';

function RoomPage(props) {
	const router = useRouter();
	const uname = router.query.uname;

	const [roomDetails, setRoomDetails] = useState([]);
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [rooms, setRooms] = useState([])

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
			let messageResponse = await fetch(`http://localhost:8080/api/rooms/${id}/messages`);
			if (!messageResponse.ok) {
				throw new Error(`HTTP error! status: ${messageResponse.status}`);
			}
			let messageResult = await messageResponse.json();
			if (messageResult.error || messageResult.status === "failed") {
				throw new Error(`Fetch - Update failed. Please check console logs. ${messageResult.error}`);
			}
			console.log('messageResult', messageResult)
			setRoomDetails(result);
			setMessages(messageResult)
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
	console.log('roomDetails', roomDetails);
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
        <title>ROOM PAGE</title>
      </Head>
			<div style={{display:"flex", flexDirection:"row", height:"100vh"}}>
				<SideBar>
					<HeaderContainer>
						<p style={{margin:"0 0 5px", fontSize:"1.5rem"}}>{uname}</p>
						<p style={{margin:"0", fontSize:"0.875rem"}}>Online for 12 minutes</p>
					</HeaderContainer>
					<UnorderedList>
						{rooms.length !==0 && rooms.map((room) => {
							const selected = room.id === roomDetails.id;
							return (
								<ListWrapper selected={selected} key={room.id} onClick={() => getRoomDetails(room.id)}>
									{room.name}
								</ListWrapper>
							)
						})}
					</UnorderedList>
				</SideBar>
				<MainSection>
					<MainHeader>
						{roomDetails.length !== 0 ? (
							<>
								<p style={{margin: "0 0 1rem", fontSize:"2rem"}}>{roomDetails.name}</p>
								{(roomDetails.users.length !== 0) && (
									<div style={{display:"flex", alignItems:"center"}}>
										<p style={{margin:"0"}}><span style={{color:"red"}}>{uname}</span>,</p>
										<p style={{margin:"0"}}>
											{roomDetails.users.join(', ')}
										</p>
									</div>
								)}
							</>
						) : (
							<h2 style={{color:"black"}}>WELCOME TO CHAT ROOM</h2>
						)}
					</MainHeader>
					<MainBody>
						{messages.length !== 0 ? messages.map((item, index) => {
							const isUser = item.name === uname;
							return (
								<div key={index} style={{ margin:"25px", display:"flex", flexDirection:"column"}}>
									<p style={{ backgroundColor: isUser ? "red" : "white", color: isUser ? "white" : "black", borderRadius:"30px", margin: isUser ? "0 0 10px auto" : "0 0 10px", padding: "15px", width:"50%"}}>{item.message}</p>
									<p style={{margin: isUser ? "0 0 0 auto" : "0", color:"#736f6f"}}>{item.name}</p>
								</div>
							)
						}) : (
							<SvgWrapper>
								<ChatFinder height="100px" width="100px"/>
								<p style={{fontSize:"20px", color: "#792b2b"}}>Choose a chat room</p>
							</SvgWrapper>
						)}
					</MainBody>
					<MainFooter>
						{roomDetails.length !== 0 ? (
						<>
							<InputWrapper 
								value={inputValue}
								onChange={(e)=>setInputValue(e.currentTarget.value)}
								placeholder="Type a message..." 
								type="text"
							/>
							<a style={{cursor: (inputValue)? "pointer" : "not-allowed"}} onClick={inputValue ? () => postMessages(roomDetails.id) : (e) => e.preventDefault()}>Send</a>
						</>
						) : (
							<p>This is developed by Parthipan Sekar</p>
						)}

					</MainFooter>
				</MainSection>
			</div>
    </>
  );
}

export default RoomPage;

// Sidebar
const SideBar = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 20rem;
	height: 100vh;
	background-color: red;
	color: white;
`;
// Input wrapper styling
const InputWrapper = styled.input`
  padding: 15px 20px;
	margin-right: 25px;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 3px;
`;
// header
const HeaderContainer = styled.div`
	padding: 2.5rem 2rem;
`;

// unordered List wrapper
const UnorderedList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;
// Input wrapper styling
const ListWrapper = styled.li`
	background-color: ${({ selected }) => (selected ? "#710101" : "red")};
  padding: 1.5rem 1rem 1.5rem 2rem;
	cursor: pointer;
	&:hover {
		background-color: #ad0404;
	}
`;
const MainSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;
const MainHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 0;
	border-bottom: 1px solid lightgray;
	box-shadow: 1px 3px 10px 0px #d0d0d0;
	min-height: 137px;
	color: #a09b9b;
`;
const MainBody = styled.div`
	flex: 1 1 0%;
	background: #f3f3f3;
	overflow-y: scroll;
`;
const MainFooter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 30px;
	border-top: 1px solid lightgray;
	box-shadow: 1px 3px 10px 0px #d0d0d0;
`;
const SvgWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%
`;