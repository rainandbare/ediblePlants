import { useState, useEffect } from 'react'
import { dbRef } from '../firebase'

function usePlantList(){
    const [plantList, setPlantList] = useState([]);
    useEffect(() => {
        dbRef.on('value', (snapshot) => {
            const data = snapshot.val()
            const newPlantList = [];
            for (let key in data) {
                data[key].id = key;
                newPlantList.push(data[key]);
            }
            setPlantList(newPlantList)
        })
    }, [])
    return plantList;
}

export default usePlantList;