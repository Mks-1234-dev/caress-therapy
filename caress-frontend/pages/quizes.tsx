import Bottombar from '@/components/bottombar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/home.module.css'
import { useRouter } from 'next/router';
import firebase from '@/firebase/clientApp';
import auth from '@/firebase/detectSignin';

export default function Quiz() {

	//auth.isLoggedIn();

	const router = useRouter();
	const [user, setUser] = useState<firebase.User | null>(null);

	const now = new Date();
	const [latestResult, setLatestResult] = useState<null | any>(null);
	const [daysDiff, setDaysDiff] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		async function fetchLatestResult() {
			const getUser = async () => {
				const currentUser = await auth.isLoggedIn();
				console.log('User object:', currentUser);
				setUser(currentUser);
				return currentUser;
			  };
			//  getUser();
			const User:any = await getUser();
			if (User && !latestResult) {
				const latestResultRef = firebase.firestore().collection('users').doc(User.uid).collection('caress-results')
				  .orderBy('date', 'desc')
				  .limit(1);
				const snapshot = await latestResultRef.get();
				if (!snapshot.empty) {
				  const latestResultData = snapshot.docs[0].data();
				  const latestResultDate = new Date(latestResultData.date);
				  const diff = Math.floor((now.getTime() - latestResultDate.getTime()) / (1000 * 3600 * 24));
				  setLatestResult(latestResultData);
				  setDaysDiff(diff);
				} else {
				  setLatestResult(null);
				  setDaysDiff(null);
				}
			} else {
				//fetchLatestResult();
			}
			setIsLoading(false);
		}
		fetchLatestResult();
	}, [user, now]);

	const [OlatestResult, setOLatestResult] = useState<null | any>(null);


	

	if (isLoading) {
		return <div>Loading...</div>;
	}


	return (
		
	)
}