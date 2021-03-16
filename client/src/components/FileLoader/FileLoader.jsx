import axios from 'axios';
import qs from 'qs';
import React from 'react'
import { FileDrop } from 'react-file-drop'
import './FileLoader.css'

function FileLoader({user, setUser}) {
    
    const [previewSource, setPreviewSource] = React.useState()

    const handleFileInputChange = (event, files) => {
        const img = files[0];
        previewFile(img);
    }
    const previewFile = (img) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
           setPreviewSource(reader.result)
        }
    }
    const handleUploadFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource)
    }

    const uploadImage = (base64EncodedImage) => {
        axios.put('uploadAvatar', qs.stringify({id: user.id, img: base64EncodedImage}))
        .then((res) => {
            setUser(res.data.user)
        })
    }
    return (
        <div>
            <h6 style={{width: '100px', textAlign: 'center'}}>Загрузить аватарку</h6>
            <form  onSubmit={handleUploadFile} >
                <div style={{height: '100px', width: '100px', border: '0.1px solid grey', borderRadius: '100px', marginBottom: '10px'}}>
                    <FileDrop
                        onDrop={(files, event) => handleFileInputChange(event, files)}
                        >
                        <h1 style={{margin: 'auto'}}>+</h1>
                    </FileDrop>
                </div>
                <button className="btn btn-primary" type='submit' >Загрузить</button>
            </form>
            {previewSource && (
                <img src={previewSource} alt='chosen' style={{height: '150px'}}/>
            )}
        </div>
    )
}

export default FileLoader
