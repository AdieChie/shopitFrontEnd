import React, { FC, PropsWithChildren, useReducer, useContext } from 'react';
import { QuestionReducer } from './reducer';
import { INITIAL_STATE, IQuestion, QuestionActionContext, QuestionContext } from './context';
import { getQuestionsRequestAction } from './actions';



const QuestionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(QuestionReducer, INITIAL_STATE);

   const getQuestions = async () => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Questions/GetAllList', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getQuestionsRequestAction(data.result));

            })
        })
    }
    return(
        <QuestionContext.Provider value={state} >
            <QuestionActionContext.Provider value={{getQuestions}}>
                {children}
            </QuestionActionContext.Provider>
        </QuestionContext.Provider>
    )
}
function useQuestionsState() {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useQuestionActions() {
    const context = useContext(QuestionActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useQuestions() {
    return {
        ...useQuestionsState(),
        ...useQuestionActions()
    }
}

export { QuestionProvider, useQuestionsState, useQuestionActions, useQuestions };