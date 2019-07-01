export type LoginFormState = {
    email: string;
    password: string;
    [x: string]: string;
}
export type LoginFormProps  = {
    classes: LoginFormPropsClasses;
    toggleForm: LoginFormPropsToggleForm;
}
interface LoginFormPropsClasses {
    paper: string;
    form: string;
    submit: string;
}
type LoginFormPropsToggleForm = ()  => void;