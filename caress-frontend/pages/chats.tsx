import Bottombar from "@/components/bottombar";
import React, { useEffect, useState } from "react";
import styles from '@/styles/chats.module.css'
import { LucideArrowLeft, LucideSearch, LucideUser } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "@/firebase/clientApp";
import 'firebase/firestore';
import auth from "@/firebase/detectSignin";
import { Timestamp } from "firebase/firestore";

export default function Chats() {

	interface User {
		uid: string;
		email: string | null;
		displayName: string | null;
		photoURL: string | null;
		emailVerified: boolean;
		phoneNumber: string | null;
		isAnonymous: boolean;
		tenantId: string | null;
		providerData: any[];
	  }

	interface Msg {
		createdAt: Timestamp
		displayName: string;
		photoURL: string;
		uid: string;
		to: string;
		to_photo: string;
		to_uid: string;
	}

	//let now = new Date();
	//let time = now.toTimeString().split(' ')[0];
	
	const router = useRouter();

	const onClickFunction = () => {
		router.replace('/chatbot');
	}

	const goBack = () => {
		router.replace('/home');
	}

	const firestore = firebase.firestore();

	const [user, setUser] = useState<User | null>();
	const [chats, setChats] = useState([]);
	const [msgs, setMsgs] = useState<Msg[] | null>([]);

	useEffect(() => {
		const authenticate = async () => {
		const currentUser = await auth.isLoggedIn();
		console.log('User object:', currentUser);
		setUser(currentUser);
    return currentUser;
		}
		authenticate();

		const fetchChats = async () => {
			if (!user) console.log('user not found')
			const db = firebase.firestore();
const querySnapshot = await db.collection('users').doc(user?.uid).collection('chat').get();
const msgArray: Msg[] = [];

querySnapshot.forEach(doc => {
  msgArray.push(doc.data() as Msg);
});
			// Update state with the array of messages
			setMsgs(msgArray);
			console.log('msgs:', msgs);
		  
		  };
		  
		fetchChats();
  }, [user]);

  
	
  

	return (
		<>
		<Head>
			<title>
				Chats
			</title>
		</Head>
		<div className={styles.header}>
			<div className={styles.top}>
				<LucideArrowLeft onClick={goBack} className={styles.arrow}/>
				<p>Chats</p>
			</div>
		</div>
		<div className={styles.search}>
			<div className={styles.searchInput}>
			<LucideSearch/>
			</div>
		</div>
		 <div className={styles.chatContainer}>
        <div className={styles.chatList}>
          <div className={styles.chat} onClick={onClickFunction}>
            <div className={styles.chatAvatar}>
				<LucideUser></LucideUser>
			</div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>ChatBot</div>
              <div className={styles.chatPreview}>
                Hey, I am an AI therapist
              </div>
            </div>
            <div className={styles.chatTime}></div>
          </div>
		  </>
		
	)
}