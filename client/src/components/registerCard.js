import BackgroundWideImage from '../elements/backgroundWideImage.js';
import Logo from '../elements/logo.js'
import { useState, useEffect } from 'react';
import { getLocale, readLocale } from '../assets/js/locale.js';

export default function RegisterCard(params){
    
    // Registration states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [locale, setLocale] = useState({})

    // Error states
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    // Handling username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false)
    }
    
    // Handling email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false)
    }

    // Handling password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false)
    }


    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
            setErrorMsg(readLocale(locale, 'error.enterAllFields'))
            setError(true);
        } 
        else if (password.length < 8){
            setErrorMsg(readLocale(locale, 'account.passwordTooShort'))
            setError(true);
        }
        else {
            setSubmitted(true);
            setError(false);
        }
    }


    useEffect(() => { 
        getLocale()
        .then(res => setLocale(res));
    });


    // Showing success message
    const successMessage = () => {
        return (
        <div className="success" style={{display: submitted ? '' : 'none',}}>
            <h1>User successfully registered!!</h1>
        </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
        <div className="error" style={{display: error ? '' : 'none',}}>
            <p>{errorMsg}</p>
        </div>
        );
    };

    
    return (
        <section id="registerCard">

            <Logo></Logo>

            <h1>{readLocale(locale, 'account.register')}</h1>
            <hr></hr>

            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form className="rows">
                {/* Labels and inputs for form data */}
                <label className="label">{readLocale(locale, 'account.username')}</label>
                <input onChange={handleUsername} className="input" value={username} type="text" />
        
                <label className="label">{readLocale(locale, 'account.email')}</label>
                <input onChange={handleEmail} className="input" value={email} type="email" />
        
                <label className="label">{readLocale(locale, 'account.password')}</label>
                <input onChange={handlePassword} className="input" value={password} type="password" />
        
                <button onClick={handleSubmit} className="btn" id="registerBtn" type="submit">
                {readLocale(locale, 'text.submit')}
                </button>
            </form>


        </section>
    )
    

    
}