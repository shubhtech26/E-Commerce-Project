import { useState } from "react";

const RegistrationPage = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState(null)


    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const register = { firstName, lastName, dob, email, mobile}

        // TODO add right route from server.js
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(register),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setFirstName('')
            setLastName('')
            setDOB('')
            setEmail('')
            setMobile('')
            setError(null)
            console.log('New user added', json)
        }
    }

    return(
        <form className="create" onSubmit={ handleSubmit }>

            <h3> Register</h3>

            <label> FirstName </label>
            <input
                type = "text"
                onChange={(e) => setFirstName(e.target.value)}
                value = {firstName}
            />
            <label> LastName </label>
            <input
                type = "text"
                onChange={(e) => setLastName(e.target.value)}
                value = {lastName}
            />
            <label> DOB </label>
            <input
                type = "date"
                max= { today }
                onChange={(e) => setDOB(e.target.value)}
                value = {dob}
            />
            <label> Email </label>
            <input
                type = "email"
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
            />
            <label> Contact No </label>
            <input
                type = "tel"
                placeholder="123-456-7890" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setMobile(e.target.value)}
                value = {mobile}
            />
        </form>

    )
}