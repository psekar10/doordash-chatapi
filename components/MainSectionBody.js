import React from 'react';
import styled from '@emotion/styled';
// SVG
import ChatFinder from '../assets/chatfinder';

/**
 *  This is a component for the Main Section Body
 */
const MainSectionBody = ({uname, messages, messagesEndRef}) => {
  return (
		<MainBody>
			{messages.length !== 0 ? messages.map((item, index) => {
				const isUser = item.name === uname;
				return (
					<MessageContainer key={index}>
						<ParagraphMessage isUser={isUser}>{item.message}</ParagraphMessage>
						<ParagraphName isUser={isUser}>{item.name}</ParagraphName>
					</MessageContainer>
				)
			}) : (
				<SvgWrapper>
					<ChatFinder height="100px" width="100px"/>
					<p>Choose a chat room</p>
				</SvgWrapper>
			)}
			<div ref={messagesEndRef} />
		</MainBody>
	)
}

export default MainSectionBody;


/**
 * Styling
 */
const MainBody = styled.div`
	flex: 1 1 0%;
	background: #eff1f2;
	overflow-y: scroll;
`;
const SvgWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	p {
		color: #792b2b;
		font-size: 20px;
	}
`;
const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 25px
`;
const ParagraphMessage = styled.p`
	background-color: ${({ isUser }) => (isUser ? "#ff1940" : "white")};
	color: ${({ isUser }) => (isUser ? "white" : "black")};
	border-radius: 30px;
	margin: ${({ isUser }) => (isUser ? "0 0 10px auto" : "0 0 10px")};
	padding: 15px;
	width: 50%;
`;
const ParagraphName = styled.p`
	color: #707070;
	margin: ${({ isUser }) => (isUser ? "0 0 0 auto" : "0")};
`;
