import { createAction } from "redux-actions";
import {IQuestion, IQuestionStateContext} from './context';

export enum QuestionActionEnum{
    getQuestionsRequest = 'GET_QUESTIONS'
}

export const getQuestionsRequestAction = createAction<IQuestionStateContext, IQuestion[]>(QuestionActionEnum.getQuestionsRequest,(questions)=>({questions}))