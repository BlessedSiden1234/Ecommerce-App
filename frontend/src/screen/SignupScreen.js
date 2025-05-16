import {React, useState, useContext, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import { getError } from '../util';
import { Store } from '../Store';
import axios from 'axios';

export default function SignupScreen(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 
    const navigate = useNavigate()

    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password does not Match')
            return;
        }
        try{
            const {data} = await axios.post(`/api/users/signup`, {name, email, password})
            ctxDispatch({type:'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        }catch(err){
            toast.error(getError(err))
        }
    }
    useEffect(() =>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    return(
        <Container>
             <Helmet>
            <title> Signup Screen</title>
        </Helmet>
        <h1 className = "my-3"> Sign Up Screen</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group className = "mb-3" controlId = "name">
                <Form.Label>Name</Form.Label>
                <Form.Control type = "name" required onChange = {(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className = "mb-3" contorlId = "email">
                <Form.Label>Email</Form.Label>
                <Form.Control type = "email" required onChange = {(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className = "mb-3" contorlId = "password">
                <Form.Label>Password</Form.Label>
                <Form.Control type = "password" required onChange = {(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className = "mb-3" contorlId = "confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type = "confirmPassword" required onChange = {(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <div className  = "mb-3">
                <Button type = "submit"> Sign Up</Button>
            </div>
            <div className = "mb-3">
            Already Existing Customer? {''}
                <Link to = {`/signin?redirect = ${redirect}`}>Sign in</Link>
            </div>
        </Form>
        </Container>
       
    )
}