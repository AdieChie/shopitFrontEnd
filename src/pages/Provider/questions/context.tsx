import { createContext } from 'react';

export interface IQuestion {
    id?:string;
    question?: string;
    answer?:string;
}

export const INITIAL_STATE: IQuestionStateContext ={}

export interface IQuestionStateContext{
readonly questions?: IQuestion[];
}

export interface IQuestionActionContext {
    getQuestions: ()=>void;
}

const QuestionContext = createContext<IQuestionStateContext>(INITIAL_STATE);
const QuestionActionContext = createContext<IQuestionActionContext>(undefined);
export {QuestionActionContext, QuestionContext};