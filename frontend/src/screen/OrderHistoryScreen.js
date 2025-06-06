import {React, useContext, useReducer, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router-dom'; 
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { getError } from '../util';
import { Button } from 'react-bootstrap';

const reducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, orders: action.payload}
        case 'FETCH_FAIL':
            return {...state, loading: false,  error: action.payload}
        default:
            return state;
    }
}
export default function OrderHistoryScreen(){
    const {state} = useContext(Store)
    const {userInfo} = state
    const navigate = useNavigate();

    const [{loading, orders, error,}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    useEffect(()=>{
        const fetchData = async() =>{
            dispatch({type: 'FETCH_REQUEST'});
            try{
                const {data} = await axios.get(`/api/orders/mine`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({type: 'FETCH_SUCCESS', payload: data})
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: getError(err)})
            }
        }
        fetchData()
    }, [userInfo])
    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            {loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox variant = "danger">{error}</MessageBox> :
            <table className = "table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>(
                        <tr key = {order._id}>
                            <td> {order._id}</td>
                            <td> {order.createdAt.substring(0, 10)}</td>
                            <td> {order.totalPrice.toFixed(2)}</td>
                            <td> {order.isPaid ? order.paidAt.substring(0, 10): 'No'}</td>
                            <td> {order.isDelivered ? order.deliveredAt.substring(0, 10): 'No'}</td>
                            <Button variant = "light" type = "button" onClick = {() => {
                                navigate(`/order/${order._id}`)
                            }}>Details</Button>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}