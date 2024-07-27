import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/quiz.module.css";
import Bottombar from "@/components/bottombar";
import Head from "next/head";

let fields = [50, 50, 50, 50, 50];

export default function Ocean_quiz() {
  const questions = [
    // 1
    {
      question: "You enjoy trying out new things",
      answers: [
        { answer: "Totally Agree", impact: [10, 0, 0, 0, 0] },
        { answer: "Somewhat Agree", impact: [5, 0, 0, 0, 0] },
        { answer: "Neutral", impact: [0, 0, 0, 0, 0] },
        { answer: "Somewhat Disagree", impact: [-5, 0, 0, 0, 0] },
        { answer: "Totally Disagree", impact: [-10, 0, 0, 0, 0] },
      ],
    },
  ];

  const [questionNumber, setQuestionNumber] = useState(0);

  const isClicked: number[] = Array(25).fill(0);
  const router = useRouter();

  const onClick = async (array: Array<number>) => {
    if (isClicked[questionNumber] === 0) {
      if (questionNumber + 1 === questions.length) {
        for (let i = 0; i < fields.length; i++) {
          fields[i] += array[i];
        }
        isClicked[questionNumber] = 1;
        router.replace({
          pathname: "/ocean-result",
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
        <title>Ocean-Quiz</title>
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
