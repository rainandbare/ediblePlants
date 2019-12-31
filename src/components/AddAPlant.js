import React, {useState, useRef, useEffect} from 'react'


import firebase, { dbRef, storageRef } from '../firebase'
import useUserInputTracking from '../hooks/useUserInputTracking'
import sluggify from '../helpers/sluggify'
import { Editor, EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';


function AddAPlant(){
    const name = useUserInputTracking('name');
    const scientific = useUserInputTracking('scientific');
    const season = useUserInputTracking('season');
    const file = useUserInputTracking('file');
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const editor = useRef(null);
    
    const focusEditor = () =>{
        editor.current.focus();
    }
    useEffect(() => {
        focusEditor()
    }, []);

    const [loading, setLoading] = useState(false)
        
    const sendInfoToFirebase = (e) => {
        e.preventDefault();
        const fileName = sluggify(name.userInput)
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const hashtagConfig = {
            trigger: '#',
            separator: ' ',
        }
        const notes = draftToHtml(
            rawContentState,
            hashtagConfig,
        );
        // console.log(markup)
        const plantImageTask = storageRef.child(`${fileName}.jpg`).put(file.userInput);
        plantImageTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(true)
            if (progress === 100){
                setLoading(false)
            }
            console.log('Upload is '+ progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    // console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    // console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
            console.log(error)
        }, function () {
            // Handle successful uploads on complete
            plantImageTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                const plantObject = {}
                plantObject.name = name.userInput;
                plantObject.season = season.userInput;
                plantObject.scientific = scientific.userInput;
                plantObject.fileUrl = downloadURL;
                plantObject.notes = notes;
                dbRef.push(plantObject);
            });
        });
    }
    const handleFileInput = (e) => {
        console.log(e.target.files[0])
        const image = new Blob([e.target.files[0]], { type: 'image/jpg' })
        file.handleUserInput(image);
    }
    // console.log(editorState)
    return(
        <section className="section">
            <div className="container">
                <form onSubmit={sendInfoToFirebase}>
                    <fieldset className="field">
                        <label className="label" htmlFor="name">Plant Name</label>
                        <div className="control">
                            <input className="input" onChange={(e) => name.handleUserInput(e.target.value)} type="text" name="name" id="name" value={name.userInput}/>
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <label className="label" htmlFor="scientific">Scientific Name</label>
                        <div className="control">
                            <input className="input" onChange={(e) => scientific.handleUserInput(e.target.value)} type="text" name="scientific" id="scientific" value={scientific.userInput} />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <label className="label" htmlFor="season">Edible Seasons</label>
                        <div className="control">
                            <input className="input" onChange={(e) => season.handleUserInput(e.target.value)} type="text" name="season" id="season" value={season.userInput} />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <label className="label" htmlFor="photo">Identification Photo</label>
                        <div className="control">
                            <input className="input" type="file" name="photo" id="photo" onChange={handleFileInput}/>
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <label className="label" htmlFor="notes">Notes</label>
                        <div className="control">
                            <div className="textarea has-fixed-size" onClick={focusEditor}>
                                <Editor
                                    ref={editor}
                                    editorState={editorState}
                                    onChange={editorState => setEditorState(editorState)}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <button className="button is-primary" type="submit" >Add Plant</button>
                    {loading ? "Please wait" : null}
                </form>
            </div>
        </section>
    )
}


export default AddAPlant;