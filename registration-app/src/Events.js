import React, { useState, useEffect } from 'react';
import './Events.css';

import axios from 'axios';
import SignIn from './SignIn';
import EventList from './EventList';

const Events = (props) => {

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        getEventsData();
    }, []);

    const getEventsData = () => {

        let axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        };

        axios.get('http://www.localhost:8080/api/event/all', axiosConfig)
            .then((response) => {

                console.log("response data", response.data);

                setEventList(() => {

                    return response.data;

                });

            })
            .catch((error) => {
                console.error(error);
            })
    }

    const removeEvent = (eventId) => {

        console.log(`funkcja removeEvent () -wywołanie przekazane eventId: `+ eventId);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.delete(
            'http://www.localhost:8080/api/event/delete/'+eventId,
            /* JSON.stringify( *//* eventId *//* ) */
            { 'headers': headers })
            .then((response) => {

                console.log("response data w delete", response.data);

                setEventList(() => {

                    return eventList.filter(eventListEl => eventListEl._id !== eventId);
                    // users.filter(user => user.id !== userID)

                });
                // getEventsData();
            })
            .catch((error) => {
                console.error(error);
            })
            
    }


    // const editEvent = (eventId) => {

    //     console.log(`funkcja editEvent () -wywołanie, przekazane eventId: `+ eventId);

    //     let axiosConfig = {

    //         /* dane: {"jureczek"
    //         }, */
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //         }
    //     };
    //     // let dane = "jureczek";

    //     axios.put(
    //         'http://www.localhost:8080/api/event/update/'+eventId, 
    //         /* JSON.stringify( *//* eventId *//* ) */
    //         /* { 'headers': headers } */axiosConfig)
    //         .then((response) => {

    //             console.log("response data w edit", response.data);
    //             console.log("response w edit", response);

    //             setEventList(() => {
                    
    //                 console.log("setEventList w edit", response.data);
    //                 return eventList.filter(eventListEl => eventListEl !== eventId);

    //             });
    //             getEventsData();
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
            
    // }
      
           



    console.log("EventList in Events", eventList);

    return (

        <div className="Events">
            <SignIn buttonMethod={getEventsData}/> 
            <EventList removeMethod={removeEvent} buttonMethod={getEventsData}/* editMethod={editEvent} */ eventList={eventList}  />
        </div>




    );

}

export default Events;