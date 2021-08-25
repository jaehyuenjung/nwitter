import React, { useState } from "react";
import { firebaseInstance, authService } from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassowrd(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "goggle") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Sign In" : "Log In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log in" : "Sign In"}
            </span>
            <div>
                <button onClick={onSocialClick} name="goggle">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};
export default Auth;
