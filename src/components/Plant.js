import React, {useEffect, useState} from 'react'
import { dbRef } from '../firebase'
import sanitizeHtml from 'sanitize-html'


function SinglePlant(props){
    const [plantData, setPlantData] = useState({notes: ''})
    useEffect(() => {
        dbRef.once('value', (snapshot) => {
            const data = snapshot.val()
            setPlantData(data[props.match.params.id])
        })
    }, [props.match.params.id])
    function createMarkup() {
        return { __html: sanitizeHtml(plantData.notes) };
    }
    console.log(sanitizeHtml(plantData.notes))
    return(
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <h1 className="title">{plantData.name}</h1>
                        <div className="notes"      dangerouslySetInnerHTML={createMarkup()}></div>
                        </div>
                        <div className="column">
                            <img src={plantData.fileUrl} alt=""/>
                        </div>

                    </div>

                </div>
            </section>
        )
}

export default SinglePlant;