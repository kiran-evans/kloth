import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../components/ContextProvider";

export const SignUpPage = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const { dispatch } = useContext(AppContext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formValues.password !== formValues.repeatPassword) return setErrorMsg("Passwords do not match.");
        setIsFetching(true);

        try {
            const res = await fetch("/user", {
                method: "POST",
                body: JSON.stringify(formValues)
            });
            dispatch({ type: 'SET_USER', payload: res.json() });
        } catch (err: any) {
            setErrorMsg(String(err));
        }
        
        setIsFetching(false);
    }

    return (
        <main>
            <h1>Create Account</h1>

            <form id="loginForm" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={formValues.password} onChange={e => setFormValues({...formValues, password: e.target.value})} />

                <label htmlFor="repeatPassword">Repeat password</label>
                <input type="password" id="repeatPassword" value={formValues.repeatPassword} onChange={e => setFormValues({...formValues, repeatPassword: e.target.value})} />

                <button type="submit" disabled={isFetching}>Submit</button>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </form>

            {/* Login with 3rd party provider */}
            <Link to="/login" title="Login">Already have an account?</Link>

        </main>
    )
}