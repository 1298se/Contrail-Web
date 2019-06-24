export interface RegisterFormProps  {
    classes: RegisterFormPropsClasses;
    toggleForm: RegisterFormPropsToggleForm;
}
interface RegisterFormPropsClasses {
    paper: string;
    avatar: string;
    form: string;
    submit: string;
}
type RegisterFormPropsToggleForm = ()  => void;
