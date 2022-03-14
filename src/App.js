import axios from 'axios';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import MyViewer from './MyViewer';

export default function App() {
    const messageSelectFile = 'Drag \'n\' drop some files here, or click to select files';
    const messageUploadingFile = 'Uploading file...';
    const imagesList = [
        'https://i.imgur.com/l9ceIuX.jpeg',
        'https://i.imgur.com/8RmHld0.jpeg'
    ]
    const [images, setImages] = React.useState(imagesList);
    const [key, setKey] = React.useState(1);
    const [visible, setVisible] = React.useState(true);
    const [indexImage, setIndexImage] = React.useState(0);
    const onDrop = useCallback(acceptedFiles => {
        const url = `https://imagepreview35bff39bf2604b289e8053bc3ef18135173158-dev.s3.amazonaws.com/${uuidv4()}.jpg`
        const options = {
            headers: {
                'Content-Type': acceptedFiles[0].type
            }
        };

        document.querySelector('#fileDrop p').innerHTML = messageUploadingFile;

        axios.put(url, acceptedFiles[0], options)
            .then(function () {
                imagesList.push(url)
                setImages(imagesList)
                setIndexImage(imagesList.length-1)
                setKey(Math.random())
            })
            .finally(function () {
                document.querySelector('#fileDrop p').innerHTML = messageSelectFile;
            })
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div>
            <a href="https://github.com/fengyuanchen/viewerjs" target="_blank">https://github.com/fengyuanchen/viewerjs</a>

            <div {...getRootProps()} id="fileDrop" style={{ borderStyle: 'solid', height: 100, width: 400 }}>
                <input {...getInputProps()} />
                <p>{messageSelectFile}</p>
            </div>

            <button onClick={() => { setVisible(true); setKey(Math.random()); } }>Show</button>
            <button onClick={() => { setVisible(false); setKey(Math.random()); } }>Hide</button>

            <MyViewer
                visible={visible}
                images={images}
                key={key}
                index={indexImage}
            />
        </div>
    )
}
