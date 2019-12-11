import React, { useState, useEffect } from 'react';
import './App.scss';
import './bootstrap.min.css';
import axios from 'axios';
import { func } from 'prop-types';
import { stat } from 'fs';
import Question from './Question';

function App() {
  const [timer,setTimer] = useState(60);
  const [qno,setQno] = useState([]);
  const [index,setIndex] = useState(0);
  const [crctAns,setCrctAns] = useState('');
  const [quizId,setQuizId] = useState(0);
  const [score,setScore] = useState(0);
  const [lastPage,setLastPage] = useState('');
  

  function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }

  useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
  .then(function (response) {
    const items =qno;
    response.data.results.map((result)=>{
      items.push(result);
      items[items.length-1].options = shuffle([result.correct_answer].concat(result.incorrect_answers));
    })
    setQno(items);
  })
  .catch(error => {
    console.log(error);
  })
  },[qno]);

  useEffect(()=>{
    let interval=null;
    if(timer > 0) {
      interval = setTimeout(() => {
        setTimer(timer => timer-1);
      },1000);
    }
    return () => clearTimeout(interval);
  });

  function checkAnswer(qInfo,selectedOption) {
   let currentQues = qno.find((question) => {
      return  question.question === qInfo.question
   })
   var element = document.getElementById(selectedOption);
   if(currentQues.correct_answer === selectedOption) {
     element.classList.add('success');
     setCrctAns('yes');
     setScore(score+1);
     setTimeout(()=> {setIndex(index+1);setCrctAns('')},1000);
   }
   else {
     setCrctAns('no');
     element.classList.add('failure');
   }
  }

  function resumeGame() {
    setQno([]);
    setQuizId(quizId+1);
    setIndex(0);
    if(lastPage === 'yes') {
      setLastPage('');
    }
    setTimer(60);

  }

  function nextQuestion() {
    setIndex(index+1);
    if(index === qno.length-1) {
       setLastPage('yes');
    }
    setCrctAns('');
  }

  return (
   <div className = "defaultBody">
     <div class="fluid-container login-container">
       <div className="header">
        <h2 style={{display:'inline-block'}}>Trivia-App </h2>
        <h3 style={{display:'inline-block',float:'right',paddingRight:35+'px'}}>Score {score}</h3>
        {timer > 0 && lastPage !== 'yes' ?<><h4 className="align-header">Questions {index+1} / {qno.length}</h4><h5 className="align-header">Remaining Time: {timer} sec(s)</h5></> :   <div className="endGameHeader"><h2> Game Over</h2><h2>Your Score {score}</h2><button className="btn-login" onClick={resumeGame} style={{float:'none'}}>Play Again</button></div>}
       </div>
        <div class=" login-center-row">
            <div class="form-container">
                <div class="js-enabled-panel">
                    <div class=" login-content">
                      <Question key={quizId} timer={timer} lastPage={lastPage} index={index} qno={qno} crctAns={crctAns} onclick={checkAnswer}/>
                    </div>
                </div>
                {qno.length && qno[index] &&  qno[index].options && qno[index].options.length && timer >0 ? 
                 (<button id="btnLogin" class="btn-login" data-cy="btn" type="submit" onClick={nextQuestion}>Continue</button>):''
                }
            </div>
        </div>
    </div>
   </div>
  );
}

export default App;
