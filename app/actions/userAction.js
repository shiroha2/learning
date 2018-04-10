import firebase from 'firebase'
import {
    USER_UPDATE,
    USER_CREATE
} from '../type/types'

export const userUpdate = ({prop , value}) => {
    return {
        type: user_UPDATE,
        payload: {prop , value}
    }
}


export const userCreate =  ({name , email ,status}) => {
    console.log(name, email ,status)
    const { currentUser } = firebase.auth();
 
    const user = firebase.database().ref(`/users/${currentUser.uid}/student`);
 
    return (dispatch) => {
        employees.push({ name, phone, status })
        .then(() => {
            dispatch({ type: USER_CREATE });
            Actions.employeeList({ type: 'reset' });
        });
    };
}