import Head from 'next/head';
import { useRouter } from 'next/router'
import React from "react";

function RoomPage(props) {
	const userouter = useRouter()
	console.log('userouter', userouter)
  return (
    <>
      <Head>
        <title>ROOM PAGE</title>
      </Head>
      <p>ROOM</p>
    </>
  );
}

export default RoomPage;
