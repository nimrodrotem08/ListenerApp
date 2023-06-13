import React, { useEffect } from 'react';
import { useState } from 'react';
import { ReactMic } from 'react-mic';



export default function myApp() {
  const [record, setRecord] = useState(false); 
  const [transcript, setTranscript] = useState('');
  const [Color, setBackGroundColor] = useState('#33475b'); 

  function alertUser() {
    setBackGroundColor('#ff0000');
    setTimeout(() => {
      setBackGroundColor('#33475b');
    }, 300);
  
  };
  
  useEffect(() => {
    const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'he-IL';

    if (record) {

     speechRecognition.onresult = (event) => {
      let currentTranscript = event.results[event.results.length - 1][0].transcript;
      const words = currentTranscript.split(' ');
      if (words[words.length - 1] == "לחזור") {
        alertUser();
      }
      
      setTranscript(currentTranscript);
    };

    speechRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
    speechRecognition.start();
    } else {
      speechRecognition.stop();
    }

    return () => {
      speechRecognition.stop();
    };

  },[record]); 

  function clickButton() {
    if (record) { 
      setRecord(false);      
    } else {
      setRecord(true);
    } 
  };

  return (
    <div style={{ backgroundColor : Color }}>
      <h1>Listener APP</h1>
      <MyButton clickButton={clickButton} record={record} />
      <hr />
      <h3> Audio Input:</h3>
      <ReactMic
          record={record}
          strokeColor="white"
          backgroundColor="black" />
      <hr />
      <h3>Transcript: </h3>
      <p> {transcript}</p>
        
    </div>
  )
}


function MyButton({clickButton, record}) {
    const text = record ? 'Turn Off' : 'Turn On';
    return (
      <button onClick={clickButton}>
        {text}
       </button>
       
    );
  }

