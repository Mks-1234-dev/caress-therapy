import Bottombar from "@/components/bottombar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/quiz.module.css";
import Head from "next/head";
import auth from "@/firebase/detectSignin";

let fields = [50, 50, 50, 50, 50, 50];

export default function Caress_quiz() {
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

  const questions = [
    // Sentiment and Emotional State
    // 1
    {
      question: "Overall, how would you rate your emotional state this week?",
      answers: [
        { answer: "Excellent", impact: [0, 0, 0, 0, 0, 10] },
        { answer: "Good", impact: [0, 0, 0, 0, 0, 5] },
        { answer: "Fair", impact: [0, 0, 0, 0, 0, 0] },
        { answer: "Poor", impact: [0, 0, 0, 0, 0, -5] },
        { answer: "Terrible", impact: [0, 0, 0, 0, 0, -10] },
      ],
    },
    // 2
    {
      question: "Have you experienced any significant mood swings this week?",
      answers: [
        { answer: "Extremely", impact: [0, 0, 0, 0, 0, -10] },
        { answer: "Quite a bit", impact: [0, 0, 0, 0, 0, -5] },
        { answer: "Moderately", impact: [0, 0, 0, 0, 0, 0] },
        { answer: "A little", impact: [0, 0, 0, 0, 0, 10] },
        { answer: "Not at all", impact: [0, 0, 0, 0, 0, 5] },
      ],
    },
    // 3
    {
      question: "Have you felt easily irritable or frustrated this week?",
      answers: [
        { answer: "Extremely", impact: [0, 0, 0, 0, 0, -10] },
        { answer: "Quite a bit", impact: [0, 0, 0, 0, 0, -5] },
        { answer: "Moderately", impact: [0, 0, 0, 0, 0, 0] },
        { answer: "A little", impact: [0, 0, 0, 0, 0, 5] },
        { answer: "Not at all", impact: [0, 0, 0, 0, 0, 10] },
      ],
    },
    // 4
    {
      question:
        "Have you experienced any significant stress or anxiety this week?",
      answers: [
        { answer: "Extremely", impact: [0, 0, 0, 0, 0, -10] },
        { answer: "Quite a bit", impact: [0, 0, 0, 0, 0, -5] },
        { answer: "Moderately", impact: [0, 0, 0, 0, 0, 0] },
        { answer: "A little", impact: [0, 0, 0, 0, 0, 5] },
        { answer: "Not at all", impact: [0, 0, 0, 0, 0, 10] },
      ],
    },
    // 5
    {
      question:
        "Have you felt any significant sense of hopelessness or despair this week?",
      answers: [
        { answer: "Extremely", impact: [0, 0, 0, 0, 0, -10] },
        { answer: "Quite a bit", impact: [0, 0, 0, 0, 0, -5] },
        { answer: "Moderately", impact: [0, 0, 0, 0, 0, 0] },
        { answer: "A little", impact: [0, 0, 0, 0, 0, 5] },
        { answer: "Not at all", impact: [0, 0, 0, 0, 0, 10] },
      ],
    },
  ];

  const [questionNumber, setQuestionNumber] = useState(0);

  const isClicked: number[] = Array(30).fill(0);

  const onClick = async (array: Array<number>) => {
    if (isClicked[questionNumber] === 0) {
      if (questionNumber + 1 === questions.length) {
        for (let i = 0; i < fields.length; i++) {
          fields[i] += array[i];
        }
        isClicked[questionNumber] = 1;
        router.replace({
          pathname: "/caress-result",
          query: { result: fields },
        });
      } else {
        for (let i = 0; i < fields.length; i++) {
          fields[i] += array[i];
        }
        isClicked[questionNumber] = 1;
        const n = questionNumber + 1;
        setQuestionNumber(n);
      }
    }
  };

  return (
    <div className={styles.content}>
      <Head>
        <title>Caress-Quiz</title>
      </Head>
      <div className={styles.progress_bar}>
        <div
          className={styles.progress}
          style={{ width: `${(questionNumber / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className={styles.container}>
        <div className={styles.question}>
          Q{questionNumber + 1}) {questions[questionNumber].question}
        </div>
      </div>
      <div className={styles.answers}>
        {questions[questionNumber].answers.map((a) => (
          <button
            type="button"
            className={styles.btn}
            onClick={() => onClick(a.impact)}
          >
            {a.answer}
          </button>
        ))}
      </div>
      <Bottombar />
    </div>
  );
}
