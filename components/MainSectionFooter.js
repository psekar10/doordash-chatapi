import React from 'react';
import styled from '@emotion/styled';

const MainSectionFooter = ({inputValue, setInputValue, roomDetails, postMessages}) => {
  return (
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
	)
}

export default MainSectionFooter;

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