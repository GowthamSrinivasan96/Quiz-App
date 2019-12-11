import React, { useState, useEffect } from 'react';
import './App.scss';
import './bootstrap.min.css';

function Question(props) {
return (
    <>
    <form class="form-signin" autocomplete="off" key={props.quizId}>
        {props.timer > 0 && props.lastPage !== 'yes'? 
            <> 
            <div className="form-group question-header">
                {props.index>=0 && props.qno.length && props.qno[props.index] ? props.qno[props.index].question:''}
            </div>
            <div className="flex-container">
                {props.qno.length && props.index>=0 && props.index < props.qno.length ?(props.qno[props.index].options.map((option)=>
                    <div key={option} id={option} className="col-md-5"  onClick={() =>{props.onclick(props.qno[props.index],option)}}>
                        {option}
                    </div>
                )):''} 
            </div>  
            </> : ''}
     </form>
     <div class="login-footer">
        <div class="banner-text-container">
            <div class="login-copyright-notice">{props.crctAns === 'yes' ?'Correct Answer':(props.crctAns === 'no'? 'Wrong Answer':'')}</div>
        </div>
     </div> 
    </>                    
)
}

export default Question;