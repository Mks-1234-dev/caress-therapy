import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@/styles/results.module.css";
import auth from "@/firebase/detectSignin";
import firebase from "@/firebase/clientApp";

export default function Caress_result() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await auth.isLoggedIn();
      } catch (error) {
        router.replace("/login");
      }
    };

    checkAuthentication();
  }, []);

  let results = router.query.result;

  if (results == undefined) {
    results = [0, 0, 0, 0, 0, 0];
  }
  let mhc =
    0.1 * results[0] +
    0.15 * results[1] +
    0.15 * results[2] +
    0.25 * results[3] +
    0.2 * results[4] +
    0.15 * results[5];

  //  firebase.firestore().collection('users').doc(user.uid).collection('caress-results').add(quizResult);

  useEffect(() => {
    const latestResultRef = firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("caress-results")
      .orderBy("date", "desc")
      .limit(1);
  });
}
