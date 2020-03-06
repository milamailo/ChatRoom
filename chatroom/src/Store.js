import React from 'react'

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
        {from: 'Milad', msg: 'hi'},
        {from: 'Ali', msg: 'hi'}
    ],
    MERN: [
        {from: 'Milad', msg: 'hey'},
        {from: 'Ali', msg: 'hey'}
    ]
}
function reducer(state, action) {
    const {from, msg, topic} = action.payload
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                        {from, msg}
                ]
            }
        default:
            return state;
    }
}

export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState);

    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    );
}