import React from 'react'
function Description (){
    return (
        <section className="section">
        <div className= 'container'>
                <p className="content"> This is a place for Anthony to record his findings about edible plants on his travels. The idea is that he will be able to record the plants that are easy or difficult to find, delicious or disgusting to eat.</p>
                <p className="content"> Once we have developed a database, we will export the data and decide what the best way to present the information is. </p>
                <p className="content"> This app is a work in progress as well! If you have a suggestion for how it could be more useful or better formatted -- go to the github <a href="https://github.com/rainandbare/ediblePlants/issues">Issues List</a> and submit an issue for review. </p>
                <div className="content extraSpace">
                    <p>
                        ♥️ to you,
                    </p>
                    <p>
                        - Suzette
                    </p>
            </div> 
        </div>
        </section>
    )
}
export default Description;