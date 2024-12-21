import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'
  
const Login = () => {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        email:"",
        password: ""
    })
    const {data,error,loading, fn:fnLogin } = useFetch(login,formData)
    const {fetchUser} = UrlState()
    const navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const longLink = searchParams.get('createNew')

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }



    const handleLogin = async()=>{
        setErrors([])
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                        .email("Invalid email")
                        .required("Email is required"),
                password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required")
            });

            await schema.validate(formData, {abortEarly:false})
            await fnLogin()
        } catch(e) {
            const newErros = {}

            e?.inner?.forEach((err)=>{
                newErros[err.path] = err.message
            })
            setErrors(newErros)
        }
    }

    useEffect(()=>{
        if(!error && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`)
            fetchUser()
        }
    },[data,error])
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>to your account if you have one</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-2">
               <div className='space-y-1'>
                    <Input name="email" type="email" placeholder="Enter email" onChange={handleInputChange}/>
                    {errors.email && <Error message={errors.email} />}
               </div>
               <div className='space-y-1'>
                    <Input name="password" type="password" placeholder="Enter password" onChange={handleInputChange}/>
                    {errors.password && <Error message={errors.password} />}
               </div>
            </CardContent>
            <CardFooter>
               <Button onClick = {handleLogin}>
                {loading ? <BeatLoader size={10} color='#36d7b7'/>: 'Login'}
                </Button>
            </CardFooter>
        </Card>

    </div>
  )
}

export default Login