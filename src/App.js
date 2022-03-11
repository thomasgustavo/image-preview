import axios from 'axios';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Viewer from 'react-viewer';

export default function App() {
  const messageSelectFile = 'Drag \'n\' drop some files here, or click to select files';
  const messageUploadingFile = 'Uploading file...';
  const imagesList = [
    { src: "https://i.imgur.com/l9ceIuX.jpeg" },
    { src: "https://i.imgur.com/8RmHld0.jpeg" },
  ]
  const [ images, setImages ] = React.useState(imagesList);
  const [ activeIndex, setActiveIndex ] = React.useState(0);
  const onDrop = useCallback(acceptedFiles => {
    const url = `https://imagepreview35bff39bf2604b289e8053bc3ef18135173158-dev.s3.amazonaws.com/${uuidv4()}.jpg`
    const options = {
      headers: {
        'Content-Type': acceptedFiles[0].type
      }
    };

    document.querySelector('#fileDrop p').innerHTML = messageUploadingFile;

    axios.put(url, acceptedFiles[0], options)
      .then(function() {
        imagesList.push({src: url})
        setImages(imagesList)
        setActiveIndex(imagesList.length - 1)
      })
      .finally(function(){
        document.querySelector('#fileDrop p').innerHTML = messageSelectFile;
      })
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const [ visible, setVisible ] = React.useState(false);

  return (
    <div>
      <div {...getRootProps()} id="fileDrop" style={{borderStyle: 'solid', height: 100, width: 400}}>
        <input {...getInputProps()} />
          <p>{messageSelectFile}</p>
      </div>

      <div id="imageViewer">
        <button onClick={() => { setVisible(true) } }>show</button>

        <div id="container" style={{width: 800, height: 600}}></div>

        <Viewer
          visible={visible}
          onClose={() => { setVisible(false); } }
          container={document.getElementById("container")}
          images={images}
          rotatable={false}
          scalable={false}
          zoomSpeed={.1}
          minScale={.5}
          maxScale={5}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}
