import React from "react";

export default  function UserCard(props){

    return (
        <>
            <div id="card-container">
                <img src={props.img} alt="user-image" />
                <h2>{props.name}</h2>
            </div>
        </>
    )
}