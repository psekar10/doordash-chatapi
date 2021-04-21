import React from 'react';
import styled from '@emotion/styled';

const MainSectionHeader = ({uname, roomDetails}) => {
  return (
		<MainHeader>
			{roomDetails.length !== 0 ? (
				<>
					<p style={{margin: "0 0 1rem", fontSize:"2rem"}}>{roomDetails.name}</p>
					{(roomDetails.users.length !== 0) && (
						<div style={{display:"flex", alignItems:"center"}}>
							<p style={{margin:"0", paddingRight:"5px"}}><span style={{color:"red"}}>{uname}</span>,</p>
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
	)
}

export default MainSectionHeader;

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
