import * as actions from "../../../store/actions/authActions";

export type LoginFormState = {
    email: string;
    password: string;
    [x: string]: string;
};
export type LoginFormProps  = {
    classes: LoginFormPropsClasses;
    toggleForm: LoginFormPropsToggleForm;
    history?: any;
    authToken?: string;
};
interface LoginFormPropsClasses {
    paper: string;
    avatar: string;
    form: string;
    submit: string;
}
type LoginFormPropsToggleForm = ()  => void;
