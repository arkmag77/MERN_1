import React, { useState, useEffect } from 'react';

import axios from 'axios';
// import Events from './Events';

import './SignIn.css';


function SignIn(props) {


    const [userMessage, setUserMessage] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [cityMessage, setCityMessage] = useState('');
    const [serverResponseErr, setserverRespErr] = useState('');

    const inputUserName = React.useRef();
    const selectEvent = React.useRef();
    const selectCity = React.useRef();

    const validate = (e) => {

        e.preventDefault();

        console.log(`funkcja validate() -wywołanie`);

        let errorCounterName = false;
        let errorCounterEvent = false;
        let errorCounterCity = false;

        if (inputUserName.current.value.trim() === '') {

            errorCounterName = true;

            setUserMessage(() => {
                console.log('Name is required');
                return 'Imię i nazwisko jest wymagane';
            });

        } else if (inputUserName.current.value.trim().length < 5) {

            errorCounterName  = true;

            setUserMessage(() => {
                console.log('This name is to short');
                return 'Imię i nazwisko jest zbyt krótkie';
            });

        } else {

            errorCounterName  = false;

            setUserMessage(() => {
                console.log('user name ok');
                return '';
            });

        }


        if (selectEvent.current.value.trim() === '') {

            errorCounterEvent = true;

            setEventMessage(() => {
                console.log('Select event');
                return 'Wybierz wydarzenie z listy rozwijalnej';
            });

        } else {

            errorCounterEvent = false;

            setEventMessage(() => {
                console.log('Event selected');
                return "";
            });

        }

        if (selectCity.current.value.trim() === '') {

            errorCounterCity = true;

            setCityMessage(() => {
                console.log('Select city');
                return 'Wybierz miasto z listy rozwijalnej';
            });

        } else {

            errorCounterCity  = false;

            setCityMessage(() => {
                console.log('City selected');
                return  '';
            });

        }

        if (errorCounterName === false && errorCounterEvent === false && errorCounterCity === false) {

            addEvent();

        }

    }

    const addEvent = () => {

        console.log(`funkcja addEvent () -wywołanie`);

        let newEvent = {
            name: inputUserName.current.value,
            event: selectEvent.current.value,
            city: selectCity.current.value
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'http://www.localhost:8080/api/event/add',
            JSON.stringify(newEvent),
            { 'headers': headers })
            .then((res) => {

                let serverRespErr;
                console.log("res w add Event", res);
                console.log("res.data w add Event", res.data);
                setserverRespErr("")
                props.buttonMethod();

            })
            
            .catch((error) => {
                console.error(error);
                setserverRespErr("Brak komunikacji z serwerem")
            })


    }

                return (

                    <div className="SignIn">

                        <h3>Formularz Zapisu Na Szkolenie</h3>

                        <form onSubmit={(e)=>{validate(e); /* props.buttonMethod() */; console.log('onSubmit na szkolenie clicked') }}>

                            <fieldset>
                                <label htmlFor="User">Imię i Nazwisko</label> <br />
                                <input ref={inputUserName} name="User" type="text" placeholder="Enter Name and Surname" />
                            </fieldset>

                            <fieldset>
                                <label htmlFor="Event">Wydarzenie</label> <br />
                                <select ref={selectEvent} name="Event" id="event-select">
                                    <option value="">--Please choose an event--</option>
                                    <option value="Front End - ReactJS">Front End - ReactJS</option>
                                    <option value="Back End - Node js">Back End - Node js</option>
                                    <option value="Full Stack - MERN">Full Stack - MERN</option>
                                    <option value="Tester Manulany">Tester Manulany</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <label htmlFor="City">Miasto</label> <br />
                                <select ref={selectCity} name="City" id="city-select">
                                    <option value="">--Please choose a city--</option>
                                    <option value="online">online</option>
                                    <option value="Kraków">Kraków</option>
                                    <option value="Warszawa">Warszawa</option>
                                </select>
                            </fieldset>

                            {(userMessage || userMessage || cityMessage) &&  <fieldset>
                                <ul className='ErrorsList'>
                                {userMessage && <li>{userMessage}</li>}
                                {eventMessage && <li>{eventMessage}</li>}
                                {cityMessage &&<li>{cityMessage}</li>}
                                </ul>
                            </fieldset>}

                            <button type="submit">Zapisz na szkolenie</button>

                            {serverResponseErr && <fieldset>
                                <span className="ServerRespMessage"> {serverResponseErr} </span>
                            </fieldset>}

                        </form>

                    </div>
                );
}

export default SignIn;