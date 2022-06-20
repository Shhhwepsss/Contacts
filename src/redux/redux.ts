import { combineReducers, createStore } from "redux";
import { IState, UserAction } from "../Interfaces/Interfaces"; 

const initialState: IState  = {
    name: "",
    password: "",
    contacts: [],
    id: 1
}

const reducer = (state = initialState, action: UserAction) => {
    switch (action.type ) {
        case "SET_USER_DATA":
            const {name, password, contacts, id} = action.userData
            return state = {...state, name, password, contacts, id}
        case "DELETE_USER_CONTACT":
            const idx = state.contacts.findIndex( item => {
                if(action.userData.deleteElement === item.phoneNumber){ 
                    return item
                }})
            
            const newArray = [
                ...state.contacts.slice(0, idx),
                ...state.contacts.slice(idx+1)
            ]
            return {...state, contacts: newArray}  
        case "ADD_USER_CONTACT":
                state.contacts.push(action.userData.newContact)
                return state = {...state}
        case "CHANGE_USER_CONTACT":
                state.contacts.map((item)=> {
                    if(item.phoneNumber === action.userData.changedContact.oldPhoneNumber){
                        item.phoneNumber= action.userData.changedContact.phoneNumber;
                        item.name = action.userData.changedContact.name
                    }
                    return item
            })
            return {...state}
        default:
            return state;
    }
}

export const store = createStore(reducer);

function addUserActionCreator(value: any){
    return {
        type: "ADD_USER",
        value: value
    }
}