import React from 'react';
import styled from '@emotion/styled';

const Sidebar = ({uname, rooms, roomDetails, getRoomDetails, minutes}) => {
  return (
		<SideBarConatiner>
			<HeaderContainer>
				<p style={{margin:"0 0 5px", fontSize:"1.5rem"}}>{uname}</p>
				<p style={{margin:"0", fontSize:"0.875rem"}}>Online for {minutes} minutes</p>
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
		</SideBarConatiner>
	)
}

export default Sidebar;

// Sidebar
const SideBarConatiner = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 20rem;
	width: 20rem;
	height: 100vh;
	background-color: #ff1940;
	color: white;
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
	background-color: ${({ selected }) => (selected ? "#800d20" : "#ff1940")};
  padding: 1.5rem 1rem 1.5rem 2rem;
	cursor: pointer;
	&:hover {
		background-color: #ce0023;
	}
`;