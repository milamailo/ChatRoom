import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

/*
    msg {
        from: 'user'
        msg: 'hi'
        topic: 'general'
    }
    state {
        general: [
            {msg}, {msg}, {msg}
        ]
        MERN: [] 
    }
*/

//////////////////////////////////
    // fetch('http://localhost:3002/chatRoom/')
    // .then(res => res.json())
    // .then(data => console.log(data));
/////////////////////////////////

const initState = {
    General: [
        { from: 'Milad', msg: 'hi' },
        { from: 'Ali', msg: 'hi' }
    ],
    MERN: [
        { from: 'Milad', msg: 'hey' },
        { from: 'Ali', msg: 'hey' }
    ]
}
function reducer(state, action) {
    const { from, msg, topic } = action.payload

    console.log('reducer');
    console.log(state);


    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state;
    }
}

let socket;
let userNamelo;
let user = Math.round(Math.random(100).toFixed(2) * 100);
function sendChatAction(value) {
    socket.emit('chat message', value);
    //console.log('sendChatAction --------> ' + value);
}

function getUserName(userName) {
    console.log('getUserName --------> ' + this.userName);
    userNamelo = userName;
}

export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);
    //////////////////////////////////////
    // console.log('Store.js');
    // console.log(JSON.stringify(allChats));
    //////////////////////////////////////
    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function (msg) {
            console.log(msg);
            //getUserName(user);
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
        });
    }

    
    if(!user) {
        user = Math.round(Math.random(100).toFixed(2) * 100);
    }
    else {

    }
    
    // const user = userNamelo;

    return (
        <CTX.Provider value={{ allChats, sendChatAction, user, getUserName}}>
            {props.children}
        </CTX.Provider>
    );
}