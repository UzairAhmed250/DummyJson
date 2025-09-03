import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { createUserWithEmailAndPassword, auth, updateProfile, collection, db, addDoc, getIdToken } from '../../../config'

export default function SignupComponent() {
    const [userinput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        password: "",
        cPassword: "",
        email: ""
    })


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userinput.email, userinput.password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName: `${userinput.firstName} ${userinput.lastName}`
            })

            await addDoc(collection(db, "users"),{
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            })

        } catch (error) {
            console.log("while adding user: ", error)
        }

        console.log('Form submitted:', userinput)
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join us today and start your journey</p>
                </div>
                
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <Input
                            label='First Name' 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={userinput.firstName} 
                            onChange={handleOnChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            label='Last Name'
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={userinput.lastName} 
                            onChange={handleOnChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="form-group text-pink-300">
                        <Input 
                            label='Email'
                            type="email" 
                            id="email" 
                            name="email" 
                            value={userinput.email} 
                            onChange={handleOnChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label='Password' 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={userinput.password} 
                            onChange={handleOnChange}
                            placeholder="Create a strong password"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            label='Confirm Password'
                            type="password" 
                            id="cPassword" 
                            name="cPassword" 
                            value={userinput.cPassword} 
                            onChange={handleOnChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <Button 
                        text="Create Account"
                        type='submit'

                    />
                </form>
                <div className="signup-footer">
                    <p>Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        </div>
    )
}
