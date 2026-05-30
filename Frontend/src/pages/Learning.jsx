import { useState } from "react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is a common sign of a phishing email?",
    options: [
      "Requesting urgent action and sensitive information",
      "Using the company logo",
      "Being well-formatted",
      "Having proper spelling",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "How can you verify if a website is legitimate?",
    options: [
      "Check the URL starts with https:// and has a valid SSL certificate",
      "The website looks professional",
      "It has many graphics",
      "It loads quickly",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "What should you do if you receive a suspicious email?",
    options: [
      "Delete it and report it",
      "Open all attachments to check",
      "Click all links to verify",
      "Reply asking for clarification",
    ],
    correct: 0,
  },
  {
    id: 4,
    question: "Which is a weak password?",
    options: [
      "P@ssw0rd123",
      "MyBirthdate1990",
      "kX9#mL2$pQ5vR",
      "R@ndomStr1ng!",
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "What does HTTPS provide?",
    options: [
      "Encrypted communication between your browser and website",
      "Faster internet speed",
      "Anonymous browsing",
      "Ad blocking",
    ],
    correct: 0,
  },
];

const EMAIL_RED_FLAGS = [
  "Requests for passwords or personal information",
  "Misspellings and grammatical errors",
  'Urgent language ("Act now!" "Verify immediately")',
  "Suspicious sender address that doesn't match the company",
  'Generic greetings ("Dear Customer")',
  "Links that don't match the displayed text",
  "Threats of account closure or legal action",
  "Requests to confirm identity information",
  "Attachments from unexpected sources",
  "Poor formatting or layout",
];

const WEBSITE_RED_FLAGS = [
  "Non-HTTPS URLs (no padlock icon)",
  "Domains that are slightly misspelled versions of real sites",
  "Poor website design and layout",
  "Excessive pop-ups and ads",
  "Requests for credit card info on non-shopping pages",
  "Pages that crash or behave strangely",
  "No contact information or privacy policy",
  "Unsolicited offers that seem too good to be true",
  "Spelling and grammar errors throughout",
  "No clear company information",
];

export default function Learning() {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === QUIZ_QUESTIONS[currentQuestion].correct;
    setAnswered({ ...answered, [currentQuestion]: selectedIndex });
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered({});
  };

  const quizComplete = Object.keys(answered).length === QUIZ_QUESTIONS.length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col ">
      <main className="w-full max-w-4xl mx-auto flex-1 px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Security Learning Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Learn how to identify and protect yourself from phishing, malware, and
          online threats
        </p>

        {!quizStarted ? (
          <>
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex w-full items-center justify-start gap-4 overflow-x-auto overflow-y-hidden">
                {["overview", "email", "website", "practices", "quiz"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-4 font-semibold whitespace-nowrap border-b-2 transition-[color] duration-150 ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div
              key={activeTab}
              className="w-full animate-fadeInUp transition-all duration-300 ease-out"
            >
              {activeTab === "overview" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Understanding Phishing and Online Threats
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Phishing is a cybercrime technique where attackers pretend
                      to be trustworthy entities to deceive users into revealing
                      sensitive information like passwords, credit cards, or
                      personal data.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Common Attack Methods:</strong>
                    </p>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li>
                        • <strong>Email Phishing:</strong> Fraudulent emails
                        designed to look legitimate
                      </li>
                      <li>
                        • <strong>Spear Phishing:</strong> Targeted attacks on
                        specific individuals or organizations
                      </li>
                      <li>
                        • <strong>Clone Phishing:</strong> Copying legitimate
                        emails with malicious links
                      </li>
                      <li>
                        • <strong>Whaling:</strong> Phishing attacks targeting
                        high-value targets like executives
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      <strong>Why This Matters:</strong> According to industry
                      reports, phishing attacks are responsible for over 90% of
                      data breaches. Being aware of these threats can protect
                      you and your organization.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "email" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Email Red Flags
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Watch out for these warning signs in suspicious emails:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {EMAIL_RED_FLAGS.map((flag, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg"
                      >
                        <p className="text-red-800 dark:text-red-200 flex items-start">
                          <span className="mr-3 font-bold">⚠️</span>
                          <span>{flag}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "website" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Website Red Flags
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Be cautious with websites that show these warning signs:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WEBSITE_RED_FLAGS.map((flag, idx) => (
                      <div
                        key={idx}
                        className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg"
                      >
                        <p className="text-yellow-800 dark:text-yellow-200 flex items-start">
                          <span className="mr-3 font-bold">🔍</span>
                          <span>{flag}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "practices" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Best Security Practices
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                      <h3 className="font-bold text-green-900 dark:text-green-200 mb-2">
                        ✓ Do This
                      </h3>
                      <ul className="text-green-800 dark:text-green-300 space-y-1 ml-4">
                        <li>• Use strong, unique passwords for each account</li>
                        <li>• Enable two-factor authentication (2FA)</li>
                        <li>• Verify sender email addresses carefully</li>
                        <li>• Hover over links to see the actual URL</li>
                        <li>• Keep software and browsers updated</li>
                        <li>• Use reputable antivirus software</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                      <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">
                        ✗ Don't Do This
                      </h3>
                      <ul className="text-red-800 dark:text-red-300 space-y-1 ml-4">
                        <li>• Click links in suspicious emails</li>
                        <li>• Share passwords or 2FA codes</li>
                        <li>• Download attachments from unknown senders</li>
                        <li>• Use the same password everywhere</li>
                        <li>• Ignore security warnings</li>
                        <li>• Open email attachments without verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "quiz" && (
                <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Test Your Knowledge
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Take this quick quiz to test what you've learned about
                    phishing and online security.
                  </p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    Start Quiz
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {!quizComplete ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                    </p>
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h2>

                <div className="space-y-3 mb-8">
                  {QUIZ_QUESTIONS[currentQuestion].options.map(
                    (option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition ${
                          answered[currentQuestion] === idx
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              answered[currentQuestion] === idx
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-400"
                            }`}
                          >
                            {answered[currentQuestion] === idx && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span className="text-gray-900 dark:text-white">
                            {option}
                          </span>
                        </div>
                      </button>
                    ),
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white disabled:opacity-50"
                  >
                    ← Previous
                  </button>
                  {currentQuestion < QUIZ_QUESTIONS.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Finish Quiz
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-left">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                  </div>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Score: {score} out of {QUIZ_QUESTIONS.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {score === QUIZ_QUESTIONS.length
                      ? "Perfect score! You're a security expert!"
                      : score >= 4
                        ? "Great job! You know your security!"
                        : "Good effort. Review the material and try again!"}
                  </p>
                </div>
                <button
                  onClick={handleFinishQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Back to Learning Hub
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
