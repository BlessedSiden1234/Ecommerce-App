import Form from "react-bootstrap/Form";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useContext, useEffect} from "react";
import { Store } from "../Store";
import { toast} from "react-toastify";
import { getError } from "../util";


export default function SigninScreen(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state;
    

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            const {data}= await axios.post('/api/users/signin', {email, password});
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
            console.log(data)
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
        <Container className = "small-container">
        <Helmet>
            <title> Sign In</title>
        </Helmet>
        <h1 className = "my-3">Sign In</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group className = "mb-3" controlId = "email">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange = {(e) => setEmail(e.target.value) } type = "email" required />
            </Form.Group>
            <Form.Group className = "mb-3" controlId = "password">
                <Form.Label> Password</Form.Label>
                <Form.Control type = "password" required onChange = {(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className = "mb-3">
                <Button type = "submit">
                    Sign In
                </Button>
            </div>
            <div className = "mb-3">
                New Customer ? {' '}
                <Link to = {`/signup?redirect=${redirect}`}> Create your Account</Link>
            </div>
        </Form>
    </Container>
    )
}