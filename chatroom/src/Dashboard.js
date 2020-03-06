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
import {CTX} from './Store'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 4)
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
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        border: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '30px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    }
}));

export default function Bashboard() {

    const classes = useStyles();

    // CTX store
    const [allChats] = React.useContext(CTX);
    //console.log({allChats}); 
    const topics = Object.keys(allChats);

    // Local state
    const [activeTapic, changeActiveTopic] = React.useState(topics[0])

    const [textValue, changeTextValue] = React.useState('');
    return (
        <div>
            <Paper className={classes.root} elevation={3}>
                <Typography variant="h4" component="h4">
                    Chat Application
            </Typography>
                <Typography variant="h5" component="h5">
                    {activeTapic}
            </Typography>
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

                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTapic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip} />
                                    <Typography variant='p'>
                                        {chat.msg}
                                    </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        id="standard-name"
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={event => changeTextValue(event.target.value)}
                    />
                    <Button variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </Paper>

        </div>
    )
}