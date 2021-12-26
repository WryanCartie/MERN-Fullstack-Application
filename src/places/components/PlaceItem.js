import React from 'react'


const PlaceItem = props =>{
    return <li className='place-item'>
        <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
        </div>
        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>

        </div>
        <div className='place-item__actions'>
            

        </div>
    </li>
}
