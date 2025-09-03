import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import {addDoc, db, collection, signInWithEmailAndPassword, auth} from "../../../config"

export default function LoginComponent() {
    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }




    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      setError("");
      setLoader(true); 
      try {
            const response = await signInWithEmailAndPassword(auth, userInput.email, userInput.password)
            const user = response.user
            console.log(response) 
          try {
              const docRef = await addDoc(collection(db, "users"), {
                  email: user.email,
                  displayName: user.displayName
              });
              console.log("Store User in Firestore: ", docRef)
          } catch (error) {
              console.error("Error while storing user", error)
          }
      } catch (err) {
          console.error(err);
          if (err instanceof Error) {
              setError(err.message)
          } else {
              setError(String(err));
          }
      } finally {
          setLoader(false); 
      }
  }

    

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>
                {error && (
                  <div className='border border-red-500 bg-red-200 text-red-600 flex justify-center items-center py-[12px]'>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <Input
                            label='Email or Username' 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={userInput.email} 
                            onChange={handleOnChange}
                            placeholder="Enter your email or username"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <Input
                            label='Password' 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={userInput.password} 
                            onChange={handleOnChange}
                            placeholder="Enter your password"
                            required
                            className=' border-8'
                        />
                    </div>
                    
                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
                    </div>
                    
                    <Button
                      className=''
                      text='Sign In'
                      type='submit'
                      loader={loader}
                     />
                </form>
                
                <div className="login-footer">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}
