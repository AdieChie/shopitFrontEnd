 import { QuestionActionEnum     } from "./actions";
 import { IQuestionStateContext } from "./context";

 export function QuestionReducer(incomingState: IQuestionStateContext, action: ReduxActions.Action<IQuestionStateContext>) : IQuestionStateContext{
    const { type, payload } = action;

    switch (type) {
        case QuestionActionEnum.getQuestionsRequest:
            return { ...incomingState, ...payload };
            default:
                return incomingState;}
 }