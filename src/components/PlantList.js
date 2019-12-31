import React from 'react'

function PlantList (props){
    const takeMeThere = (id) => {
        props.history.push(`/plant/${id}`)
    }
    return(
        <section className="section">
            <div className="container">
                <table className="table is-striped is-narrow is-fullwidth is-hoverable">
                    <thead>
                        <th>Name</th>
                        <th>Scientific Name</th>
                        <th>Season</th>
                        <th>Image</th>
                    </thead>
                    <tbody>
                    {props.plantList.map((plantSpec) => {
                        return (
                            <tr onClick={() => takeMeThere(plantSpec.id)} key={plantSpec.id}>
                                <td>{plantSpec.name}</td>
                                <td>{plantSpec.scientific}</td>
                                <td>{plantSpec.season}</td>
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