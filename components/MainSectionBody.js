import React from 'react';
import styled from '@emotion/styled';

import ChatFinder from '../assets/chatfinder';

const MainSectionBody = ({uname, messages}) => {
  return (
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
	)
}

export default MainSectionBody;

const MainBody = styled.div`
	flex: 1 1 0%;
	background: #f3f3f3;
	overflow-y: scroll;
`;
const SvgWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%
`;
