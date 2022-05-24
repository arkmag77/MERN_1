// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventList.css';

function EventList(props) {

    const [popUpWindow, setPopUpWindow] = useState(false);
    const [eventIdToDelete, setEventIdToDelete] = useState();
    const [eventToEdit, isEditBtnClicked] = useState(false);
    const [eventIdToEdit, setEventIdToEdit] = useState('');
    const [userName, setUserName] = useState('');

    let eventList = props.eventList;

    // const inputUserNameEdited = React.useRef();


    
    console.log("eventList w EventList", eventList);
    let counter = 1;

    const validate = (e) => {

        e.preventDefault();
        

        console.log(`funkcja validate() -wywołanie`);
        // console.log(`NameEdited:  ${inputUserNameEdited.current.value}`);


    }

    const editEvent = (eventId) => {

            
            console.log(`funkcja editEvent () -wywołanie, przekazane eventId: `+ eventId);
            // console.log(`NameEdited:  ${inputUserNameEdited.current.value}`);
            // console.log(`NameEdited:  ${inputUserName}`);


            /* let editedEvent = {
                name: inputUserNameEdited.current.value
            }; */

            let editedEvent = {
                name: userName
            };
    
                
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
    
            axios.put(
                'http://www.localhost:8080/api/event/update/'+eventId, 
                JSON.stringify(editedEvent),
                { 'headers': headers })
                .then((response) => {
    
                    console.log("response data w edit", response.data);
                    props.buttonMethod();
                })
                .catch((error) => {
                    console.error(error);
                })
                
        }

    let trElements = eventList.map((event) =>  { 
        console.log("Event id", event._id);
        return (
            <tr  key={event._id}  >
                <td className="ID">{counter++}.</td>
                <td className="UserName">{!eventToEdit && event.name} {eventToEdit && (!(event._id===eventIdToEdit)? 
                event.name:<input value={userName} onChange={(e)=>setUserName(e.target.value)} name="User" type="text" />)} </td> 
                <td className="Event">{event.event} </td>
                <td className="City">{event.city} </td>
                <td> <button className="Btn" onClick={()=>{setPopUpWindow(true); setEventIdToDelete(event._id);
                    console.log("setPopUpWindow wywołanie, event._id: ", event._id) }}> Usuń </button></td>
                <td> { ( !(event._id===eventIdToEdit) || !eventToEdit) &&  <button className="btnEdit" onClick={()=>{console.log("Edit btn clicked"); 
                isEditBtnClicked(true); setEventIdToEdit(event._id); setUserName(event.name);}}> Edytuj</button>}
                    {eventToEdit && ((event._id===eventIdToEdit) && <button className="btnSave" onClick={()=>{console.log("Save btn clicked"); 
                    editEvent(event._id); isEditBtnClicked(false);}}> Zapisz</button>)}
                </td>
            </tr>
        );
    }) 

    return (

        <div className="Events">
            {popUpWindow && <div className="PopUpWindow" >
                    <h3>Czy na pewno chcesz usunąć Wydarzenie?</h3>
                    <fieldset className="Buttons">
                        <button className="btnYes" onClick={()=>{console.log("Yes btn clicked, eventList._id:", eventIdToDelete);
                        props.removeMethod(eventIdToDelete); setPopUpWindow(false) }}> Tak </button>
                        <button className="btnNo" onClick={()=>{console.log("No btn clicked"); setPopUpWindow(false)}}> Nie </button>
                    </fieldset>
            </div> }    

            <div>
                <table className="EventsTable">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Imie i Nazwisko</td>
                            <td>Wydarzenie</td>
                            <td>Miasto</td>
                            <td>Akcje</td>
                            <td>Akcje</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody> 
                </table>
            </div>

        </div>

    );


}

export default EventList;
