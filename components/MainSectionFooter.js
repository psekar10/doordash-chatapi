import React from 'react';
import styled from '@emotion/styled';

/**
 *  This is a component for the Main Section Footer
 */
const MainSectionFooter = ({inputValue, setInputValue, roomDetails, postMessages, handleKeyPress}) => {
  return (
		<MainFooter>
			{roomDetails.length !== 0 ? (
			<>
				<InputWrapper 
					value={inputValue}
					name="inputValue"
					onChange={(e)=>setInputValue(e.currentTarget.value)}
					onKeyPress={handleKeyPress}
					placeholder="Type a message..." 
					type="text"
				/>
				<AnchorWrapper inputValue={inputValue} onClick={inputValue ? () => postMessages(roomDetails.id) : (e) => e.preventDefault()}>Send</AnchorWrapper>
			</>
			) : (
				<p>This is developed by Parthipan Sekar</p>
			)}
		</MainFooter>
	)
}

export default MainSectionFooter;

/**
 * Stylings
 */
const InputWrapper = styled.input`
  padding: 15px 20px;
	margin-right: 25px;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 3px;
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
const AnchorWrapper = styled.a`
	cursor: ${({ inputValue }) => (inputValue ? "pointer" : "not-allowed")};
	color: #4a90e2;
	font-weight: 700;
`;