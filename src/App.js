
import React,{ useState, useEffect } from 'react';
import {  FormControl, Input} from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input,setInput]=useState('');
  const [messages,setMessages]=useState([]);
  const [username,setUsername]=useState('');
  
  useEffect(() => {
    db.collection('messages').orderBy('timestamp',"desc").onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => ({id:doc.id ,message:doc.data()})))
    });
  },[])

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, []);

  const sendMessage = (event) =>{
    // all the logic to send the message goes here!
    event.preventDefault(); // to prevent the browser from refreshing after the submission of the form.
    db.collection('messages').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
  
    setInput('');
  }

  return (
    <div className="App">
      <img style={{height:'100px'}, {width:'100px'}} src="https://i.pinimg.com/originals/a2/19/95/a2199526dbfcaca0382d4a73b0090324.jpg" />
      <h1>Welcome To The Messenger</h1>
      
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className="app__Input" placeholder='Enter a message' value={input} onChange={event =>setInput(event.target.value)} />

          <IconButton className="app__iconButton" disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>

        </FormControl>
      </form>
      
      <FlipMove>
      {
        messages.map(({id,message}) =>(
          <Message key={id} username={username} message={message} />
        ))
      }
      </FlipMove>
    </div>
  );
}

export default App;
