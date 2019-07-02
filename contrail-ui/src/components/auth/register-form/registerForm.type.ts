export interface RegisterFormProps  {
    classes: RegisterFormPropsClasses;
    toggleForm: RegisterFormPropsToggleForm;
}
interface RegisterFormPropsClasses {
    paper: string;
    form: string;
    submit: string;
}
type RegisterFormPropsToggleForm = ()  => void;
