import React from 'react'
import './ImageUpload.css'
import { Button } from '@material-ui/core'
import firebase from 'firebase'
import { db, storage } from './firebase';

function ImageUpload({ user }) {
    const [image, setImage] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [caption, setCaption] = React.useState('');

    const handleFile = (e) => {
        console.log('image', e.target.files[0])
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleCaption = (e) => {
        setCaption(e.target.value);
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log('uploadTask', uploadTask)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function ...
                console.log('error' , error)
                alert(error.message)
            },
            () => {
                //complete function
                storage
                 .ref('images')
                 .child(image.name)
                 .getDownloadURL()
                 .then(url => {
                     // post image inside db
                     db.collection ("posts").add({
                         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                         caption: caption,
                         imageUrl: url,
                         username: user.displayName,
                     })

                     setProgress(0);
                     setCaption('');
                     setImage(null);
                 })
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption..." onChange={handleCaption} />
            <input type="file" onChange={handleFile} />
            <Button onClick={handleUpload} disabled={!image}>
                Upload
            </Button>
        </div>
    )

}

export default ImageUpload
