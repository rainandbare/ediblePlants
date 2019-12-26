import React from 'react'
import usePlantList from '../hooks/usePlantList'

function PlantList (){
    const plantList = usePlantList();
    return(
        <section className="section">
            <div className="container">
                <table className="table is-striped is-narrow is-fullwidth">
                    <thead>
                        <th>Name</th>
                        <th>Scientific Name</th>
                        <th>Season</th>
                        <th>Image</th>
                    </thead>
                    <tbody>
                    {plantList.map((plantSpec) => {
                        return (
                            <tr key={plantSpec.id}>
                                <td>{plantSpec.name}</td>
                                <td>Lorem ipsum dolor</td>
                                <td>Spring</td>
                                <td><figure className="image is-128x128"><img src={plantSpec.fileUrl} alt="" /></figure></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default PlantList ;