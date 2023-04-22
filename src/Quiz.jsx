import React from 'react'
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const Quiz = () => {

    let questionList = [{
        number: 1,
        que: "What is Git?",
        ans: "A version control system.",
        option: [{opt:"A remote repository platform.", status:false}, {opt:"A nickname for GitHub.", status:false},{opt:"A version control system.", status:false} ,{opt: "A programming language.", status:true}]
        // option: ["A programming language.", "A remote repository platform.", "A nickname for GitHub.", "A version control system."]
    },
    {
        number: 2,
        que: "What is the command to get the installed version of Git?",
        ans: "git --version",
        // option: [" git help version", " git --version", " getGitVersion", " gitVersion"]
        option: [{opt:"git help version", status:false}, {opt:"getGitVersion", status:false},{opt:"gitVersion", status:false} ,{opt: "git --version", status:true}]
    }
        ,
    {
        number: 3,
        que: "Which option should you use to set the default user name for every repository on your computer?",
        ans: "--global",
        // option: [" --all", " --global", " No need to specify, that is the default.", " --A"]
        option: [{opt:"--all", status:false}, {opt:"--A", status:false},{opt:"No need to specify", status:false} ,{opt: "--global", status:true}]
    },
    {
        number: 4,
        que: "What is the command to get the current status of the Git repository?",
        ans: "git status",
        option: [{opt:" git config --status", status:false}, {opt:" --status", status:false},{opt:" git getStatus", status:false} ,{opt: " git status", status:true}]
    },
    {
        number: 5,
        que: "What is the command to initialize Git on the current repository?",
        ans: "git init",
        // option: [" start git", " git init", " git start", " initialize git"]
        option: [{opt:" start git", status:false}, {opt:" git start", status:false},{opt:" initialize git", status:false} ,{opt: " git init", status:true}]
    }
        ,
    {
        number: 6,
        que: "Git commit history is automatically deleted:",
        ans: "Commit history is never automatically deleted.",
        // option: [" Every year.", "Commit history is never automatically deleted.", " Every month.", "  Every 2 weeks."]
        option: [{opt:"Every year.", status:false}, {opt:" Every month.", status:false},{opt:"Every 2 weeks.", status:false} ,{opt: "Commit history is never automatically deleted.", status:true}]
    }
    ]

    const [question, setquestionList] = useState(questionList);
    const [questionCount, setquestionCount] = useState(0);
    const [nextQuestionTimer, setnextQuestionTimer]  = useState(0);
    const [showScore, setShowScore] = useState(true);
    const [score, setScoreCount] = useState(0);
    const [show, setShow] = useState(false);
    const [showQuestion, setshowQuestion] = useState(false);

    if(showQuestion === true){
        setInterval(() => {
            setnextQuestionTimer(nextQuestionTimer + 1)
        }, 999);
    }

   
    const selectAnswer = (ans) => {
         if(ans.status === true){
             setScoreCount(score + 1)
         }
        if (questionCount < question.length - 1) {
            setquestionCount(questionCount + 1)
        } else {
            alert("You Have reached end of the Question");
            setShowScore(false);
        }
    }

    const handleClose = () => {
        setShow(false);
    };

    const handleQuestion = () => {
        setShow(false);
        setshowQuestion(true);
    }
    const handleShow = () => setShow(true);
    const handleCloseQuestion = () => setshowQuestion(true);

    return (
        <div>

            <Button className="start-btn d-flex justify-content-center align-items-center h-100" onClick={handleShow}>
                Start Quiz
            </Button>

            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>  <h5 className="modal-title text-center" id="exampleModalLabel">Some Rules for the Quiz</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="quiz-info">
                        <ol>
                            <li>You will have only <span>15 seconds</span> per each question.</li>
                            <li>Once you select your answer, you can't reselect.</li>
                            <li>You cant select any option once time goes off</li>
                            <li>you cant exit from the Quiz while you're playing</li>
                            <li>You'll get points on the basis of your correct answers</li>
                        </ol>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Exit Quiz
                    </Button>
                    <Button variant="primary" onClick={handleQuestion}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showQuestion} onHide={handleCloseQuestion}>
                <Modal.Header>
                    <Modal.Title className="d-flex justify-content-between ">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Awesome Quiz Application</h5>
                        <div className="timer">
                            <div>Time left : <span id="time-sec">{nextQuestionTimer}</span></div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showScore ? (
                        <div id="quiz-qa-info">
                            <div className="question-text">
                                <span>{question[questionCount].que}</span>
                                {/* {console.log(question[questionCount].option)} */}
                            </div>
                            <div className="option-list">
                                {question[questionCount].option &&
                                    question[questionCount].option.map((curEle, index) => {
                                        return (
                                            <div className="option" key={index} onClick={() => selectAnswer(curEle)}>
                                                <span>{curEle.opt}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                        <div id="result">
                            <div className="result-text text-center">
                                <span>Your Correct Answer : <strong id="correct">{score}</strong></span> <br />
                                <span>Your Incorrect Answer : <strong id="incorrect">{question.length}</strong></span>
                            </div>
                        </div>
                    )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="total-que">
                        <p><span id="complete-question">{questionCount + 1}</span> of <span id="total-question">{question.length}</span> Question</p>
                    </div>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Quiz