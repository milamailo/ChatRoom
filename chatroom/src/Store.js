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

function sendChatAction(value) {
    socket.emit('chat message', value);
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
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
        });
    }

    const user = 'user ' + (Math.random(100).toFixed(2) * 100);

    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    );
}