import { useState } from "react";
import { Link } from 'react-router-dom';

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
        <div>
            <section className="login-custom-bg dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register
                            </h1>
                            <form className="space-y-4 md:space-y-6 create" onSubmit={ handleSubmit }>
                                <div>
                                    <label for="FirstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
                                    <input type = "text" name="FirstName" id="FirstName" 
                                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     onChange={(e) => setFirstName(e.target.value)} 
                                     value = {firstName} required="" />
                                </div>
                                <div>
                                    <label for="LastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
                                    <input type = "text" name="LastName" id="LastName" 
                                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     onChange={(e) => setLastName(e.target.value)}
                                     value = {lastName} />
                                </div>
                                <div>
                                <label for="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type = "email" name="Email" id="Email"  
                                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     onChantype = "email"
                                     onChange={(e) => setEmail(e.target.value)}
                                     value = {email}/>
                                </div>
                                <div>
                                    <label for="DOB" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DOB</label>
                                    <input type = "date" name="DOB" id="DOB" 
                                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     max= { today }
                                     onChange={(e) => setDOB(e.target.value)}
                                     value = {dob}/>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link To="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log In</Link>
                                </p>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                                    Or login using.... <a href="/auth/google" className="authGoogle font-medium google-btn text-primary-600 hover:underline dark:text-primary-500">Google+</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}


export default RegistrationPage;