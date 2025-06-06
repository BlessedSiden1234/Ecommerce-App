import {React, useContext, useState, useReducer} from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import {Helmet} from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { getError } from '../util';
import { toast } from 'react-toastify';
import axios from 'axios';

const reducer = (state, action) =>{
    switch(action.type){
        case 'UPDATE_REQUEST':
            return {...state, loadingUpdate: true}
        case 'UPDATE_SUCCESS':
            return {...state, loadingUpdate: false}
        case 'UPDATE_FAIL':
            return {...state, loadingUpdate: false}
        default:
            return state;
    }   
}
export default function ProfileScreen(){
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {userInfo} = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    })

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.put('/api/update/user', {
                name, email, password
            }, {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({type: 'UPDATE_SUCCESS'})
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
            
        }catch(err){
            dispatch({type: 'UPDATE_FAIL'})
            toast.error(getError(err))
        }
    }
    return (
        <div className = "container small-container">
            <Helmet>
                <title> Profile Screen</title>
            </Helmet>
            <h1 className = "my-3"> User profile</h1>
            <form onSubmit = {submitHandler}>
                <Form.Group controlId = "name" className = "mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value = {name} onChange = {(e) => setName(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId = "email" className = "mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId = "password" className = "mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange = {(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId = "password" className = "mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange = {(e) => setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <div className='mb-3'>
                    <Button type = "submit">Update</Button>
                </div>
            </form>
        </div>
    )
}