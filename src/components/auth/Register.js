import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { authApi, userIdStorageKey, userTokenStorageKey } from "./authSettings"
import "./Auth.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const bio = useRef()
    const [imageString, setImageString] = useState('')
    const currentCoffee = useRef()
    const currentBrewMethod = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const history = useHistory()
    
    const getBase64 = (file, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(file)
    }

    const createImageString = (file, setVar) => {
        getBase64(file, (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setVar(base64ImageString)
        });
    }

    const updateImageString = (event) => {
        createImageString(event.target.files[0], setImageString)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "username": email.current.value,
                "bio": bio.current.value,
                "currentCoffee": currentCoffee.current.value,
                "currentBrewMethod": currentBrewMethod.current.value,
                "profileImage": imageString,
                "password": password.current.value,
            }

            return fetch(`${authApi.localApiBaseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("valid" in res && res.valid) {
                        localStorage.setItem(userTokenStorageKey, res.token )
                        localStorage.setItem(userIdStorageKey, res.id)
                        localStorage.setItem("isAdmin", res.isAdmin)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input ref={bio} type="bio" name="bio" className="form-control" placeholder="Bio" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="currentCoffee"> Current Coffee </label>
                    <input ref={currentCoffee} type="currentCoffee" name="currentCoffee" className="form-control" placeholder="Current coffee" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="currentBrewMethod"> Current Brewing Method </label>
                    <input ref={currentBrewMethod} type="currentBrewMethod" name="currentBrewMethod" className="form-control" placeholder="Brew method" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="profileImage"> Profile Image </label>
                    <input type="file" name="profileImage" className="form-control" onChange={updateImageString} />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
