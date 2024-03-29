import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import ApiService from '../services/index';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse); CreateGoogleUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const CreateGoogleUser = (codeResponse) => {
        ApiService.CreateUser(codeResponse).then((res) => {
            if (res.status === 200) {
                navigate(`/home-page/${res.data.user.id}`);
            }
        });
    };

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile.length > 0 ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default Login;