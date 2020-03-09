import React from 'react';
// lib to make Styles 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
// lib to make List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// lib to make Chip
import Chip from '@material-ui/core/Chip';
// lib ta make Button
import Button from '@material-ui/core/Button';
// lib to make TextField
import TextField from '@material-ui/core/TextField';
// import CTX from Store
import { CTX } from './Store'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px',
        padding: theme.spacing(3, 4),
        background: '#2d43f0'
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   '& > *': {
        //     margin: theme.spacing(1),
        //     width: theme.spacing(16),
        //     height: theme.spacing(16),
        //   },
    },
    root_1: {
        marginLeft: '50px',
        marginRight: '50px',
        marginTop: '20px',
        padding: theme.spacing(3, 4),
        background: 'yellow'
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   '& > *': {
        //     margin: theme.spacing(1),
        //     width: theme.spacing(16),
        //     height: theme.spacing(16),
        //   },
    },
    root_2: {
        marginTop: '20px',
        marginLeft: '50px',
        marginRight: '50px',
        padding: theme.spacing(3, 4),
        background: '#2d43f0'
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   '& > *': {
        //     margin: theme.spacing(1),
        //     width: theme.spacing(16),
        //     height: theme.spacing(16),
        //   },
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '50px',
        marginRight: '50px'
    },
    flex_1: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '50px'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
        borderLeft: '2px solid yellow',
        paddingLeft: '20px',
        color: 'yellow'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '30px'
    },
    chatBox: {
        width: '55%',
        textDecorationColor: 'yellow'
    },
    button: {
        width: '15%',
        background: 'yellow',
        color: 'blue',
        marginLeft: '10px'
    },
    emptyBox: {
        width: '30%',
        alignItems: 'center',
        padding: theme.spacing(3, 0),
        marginRight: '10px'
    }
}));

export default function Bashboard() {

    const classes = useStyles();

    // CTX store
    const { allChats, sendChatAction, user, getUserName } = React.useContext(CTX);
    //console.log({allChats}); 
    const topics = Object.keys(allChats);

    // Local state
    const [activeTapic, changeActiveTopic] = React.useState(topics[0]);

    const [textValue, changeTextValue] = React.useState('');
    const [userValue, changeUserValue] = React.useState('');


    // console.log('Bashboard');  
    // console.log(allChats);   
    return (
        <div>
            <Paper className={classes.root} elevation={15}>
                <Paper className={classes.root_1} elevation={10}>
                    <Typography variant="h4" component="h4">
                        Chat Application
                </Typography>

                    <Typography variant="h5" component="h5">
                        {activeTapic}
                    </Typography>
                </Paper>
                <Paper className={classes.root_2} elevation={10}>
                    <div className={classes.flex}>

                        <div className={classes.topicsWindow}>
                            <List>
                                {
                                    topics.map(topic => (
                                        <ListItem onClick={event => changeActiveTopic(event.target.innerText)} key={topic} button>
                                            <ListItemText primary={topic} />
                                        </ListItem>

                                    ))

                                }
                            </List>
                        </div>

                        <Paper className={classes.chatWindow} elevation={3}>

                            {
                                allChats[activeTapic].map((chat, i) => (
                                    <div className={classes.flex_1} key={i}>
                                        <Chip label={'user' + chat.from} className={classes.chip} />
                                        <Typography variant='body1'>
                                            {chat.msg}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </Paper>
                    </div>
                    <div className={classes.flex}>
                        <Paper className={classes.emptyBox} elevation={3}>
                            <Typography variant='body1'>

                                <TextField
                                    color='secondary'
                                    label="User Name"
                                    className={classes.chatBox}

                                    value={'user' + user}
                                    onChange={event => changeUserValue(event.target.value)}
                                    InputProps={{
                                        readOnly: true,
                                    }} />

                                {/* copy right by Mahdi and Ali */}
                            </Typography>
                        </Paper>
                        <TextField
                            color='secondary'
                            label="Send a chat"
                            className={classes.chatBox}
                            value={textValue}
                            onChange={event => changeTextValue(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                sendChatAction({ from: user, msg: textValue, topic: activeTapic });
                                // getUserName(userName);
                                changeTextValue('');
                                changeUserValue(user);
                                // console.log('Button');    
                                // console.log(allChats);                  
                            }}
                        >
                            Send
                    </Button>
                    </div>
                </Paper>
            </Paper>

        </div>
    )
}