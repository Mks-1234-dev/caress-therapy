import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '@/firebase/detectSignin';
import firebase from '@/firebase/clientApp';


export default function ProfileView() {

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

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
	const getUser = async () => {
	  const currentUser = await auth.isLoggedIn();
	  console.log('User object:', currentUser);
	  setUser(currentUser);
	};
	getUser();
}, []);


  interface QuizResult {
	date: string;
	openness: number;
	conscientiousness: number;
	extraversion: number;
	agreeableness: number;
	neuroticism: number;
	traits: Array<string>;
  }

  interface Mood {
	date: string;
	mood: string;
  }
  

  const [latestQuizResult, setLatestQuizResult] = useState<QuizResult | null>(null);

  const [moods, setMoods] = useState<Mood[]>([]);

  const [isTherapist, setIsTherapist] = useState(false);

  interface Therapist {
	exists: boolean;
	bio: string;
  }

  useEffect(() => {
	const getUser = async () => {
	  const currentUser = await auth.isLoggedIn();
	  console.log('User object:', currentUser);
	  setUser(currentUser);
	  setIsLoading(false);
	};
	getUser();
  
	if (!user) {
	  return;
	}
  
	const checkAuthentication = async () => {
	  try {
		await auth.isLoggedIn();
	  } catch (error) {
		router.replace('/login');
	  } 
	};
	checkAuthentication();
  
	const getLatestQuizResult = async () => {
		try{
	const isTherapistRef = ((await firebase.firestore().collection('therapists').doc(user?.uid).get()).data() as Therapist).exists;
	if (isTherapistRef) {
	setIsTherapist(true);
	}
} catch(e) {

}
	  try {

		const today = new Date().toDateString();

		const emojiRef = firebase
						.firestore()
						.collection('users')
						.doc(user?.uid)
						.collection('mood').orderBy('date', 'asc').limit(7);
					const snapshot = await emojiRef.get();
					if (snapshot.empty) {
						console.log('emoji not done');
					}
					if (!snapshot.empty) {
						setMoods(snapshot.docs.map((doc) => doc.data() as Mood));
					}
		if (!latestQuizResult) {
		const latestResultRef = firebase.firestore().collection('users').doc(user?.uid).collection('ocean-results')
		  .orderBy('date', 'desc')
		  .limit(1);
  
		const snapshot = await latestResultRef.get();
  
		if (!snapshot.empty) {
		  const latestResult = snapshot.docs[0].data() as QuizResult;
		  setLatestQuizResult(latestResult);
		} else {
		  setLatestQuizResult(null);
		}
	}
	  } catch (error) {
		console.log('Error getting latest quiz result:', error);
		setLatestQuizResult(null);
	  }
	};
	getLatestQuizResult();
  }, [user]);
  
  
  const handleLogout = async () => {
	try {
	  await firebase.auth().signOut();
	  router.push('/login');
	} catch (error) {
	  console.error(error);
	}
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const Caress_results = () => {
	router.replace('/mental-health-reports');
  }

  const therapist = () => {
	if (isTherapist) {
		router.replace('/therapist');
	} else {
		router.replace('/therapist-profile');
	}
  }



  if (isLoading) {
    return <p>Loading...</p>;
  }




  return (
	
  );
}
