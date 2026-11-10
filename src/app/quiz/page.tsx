"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { questions } from "@/data/questions";

export default function QuizPage() {
  const { language } = useLanguage();
  const ar = language === "ar";

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const options = ar ? question.optionsAr : question.optionsEn;
  const progress = ((current + 1) / questions.length) * 100;

  function chooseAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
  }

  function nextQuestion() {
    if (selected === null) return;

    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((previous) => previous + 1);
      setSelected(null);
    }
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  }

  const score = answers.reduce(
    (total, answer, index) =>
      total + (answer === questions[index].answer ? 1 : 0),
    0
  );

  return (
    <main>
      <Navbar />

      <section className="quiz-page">
        <div className="quiz-heading">
          <span className="eyebrow">
            {ar ? "تحدي المعرفة الفضائية" : "SPACE KNOWLEDGE CHALLENGE"}
          </span>
          <h1>{ar ? "اختبار النظام الشمسي" : "Solar System Quiz"}</h1>
          <p>
            {ar
              ? "أجب عن الأسئلة التالية واختبر معلوماتك عن الكواكب."
              : "Answer the following questions and test your knowledge of the planets."}
          </p>
        </div>

        <div className="quiz-card">
          {!finished ? (
            <>
              <div className="quiz-top">
                <span>
                  {ar ? "السؤال" : "QUESTION"} {current + 1} / {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="question-content">
                <span className="question-number">
                  {String(current + 1).padStart(2, "0")}
                </span>

                <h2>{ar ? question.ar : question.en}</h2>

                <div className="options-list">
                  {options.map((option, index) => {
                    const isCorrect = index === question.answer;
                    const isSelected = selected === index;

                    let optionClass = "option-button";

                    if (selected !== null && isCorrect) {
                      optionClass += " correct";
                    } else if (isSelected && !isCorrect) {
                      optionClass += " incorrect";
                    }

                    return (
                      <button
                        key={index}
                        className={optionClass}
                        onClick={() => chooseAnswer(index)}
                        disabled={selected !== null}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {selected !== null && isCorrect && <span>✓</span>}
                        {isSelected && !isCorrect && <span>✕</span>}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div className={`answer-feedback ${selected === question.answer ? "success" : "error"}`}>
                    <strong>
                      {selected === question.answer
                        ? ar ? "إجابة صحيحة!" : "Correct Answer!"
                        : ar ? "إجابة غير صحيحة" : "Not Quite!"}
                    </strong>
                    <p>
                      {ar ? question.explanationAr : question.explanationEn}
                    </p>
                  </div>
                )}

                <button
                  className="primary-button next-button"
                  onClick={nextQuestion}
                  disabled={selected === null}
                >
                  {current === questions.length - 1
                    ? ar ? "عرض النتيجة" : "View Results"
                    : ar ? "السؤال التالي" : "Next Question"}
                  <span>→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="result-content">
              <div className="result-icon">🏆</div>
              <span className="eyebrow">
                {ar ? "اكتمل التحدي" : "CHALLENGE COMPLETED"}
              </span>
              <h2>{ar ? "أحسنت!" : "Well Done!"}</h2>
              <div className="score-circle">
                <strong>{score}</strong>
                <span>/ {questions.length}</span>
              </div>
              <p>
                {ar
                  ? `لقد أجبت إجابة صحيحة عن ${score} من ${questions.length} أسئلة.`
                  : `You answered ${score} out of ${questions.length} questions correctly.`}
              </p>
              <div className="result-actions">
                <button className="primary-button" onClick={restartQuiz}>
                  {ar ? "إعادة الاختبار" : "Try Again"}
                </button>
                <Link href="/" className="secondary-button">
                  {ar ? "العودة للرئيسية" : "Back Home"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
