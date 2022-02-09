import React, { useState } from 'react';
import styles from './peopleList.module.scss';
import axios from 'axios';

export const PeopleList = (props) => {
	const { getAllPeople, people, prepareFormForUpdate} = props
	const deletePerson = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/people/${id}`);
		} catch (err) {
			console.error(err);
		}
		getAllPeople();
	};



	return (
		<div className={styles.container}>
			<button onClick={getAllPeople}>Show me the people!</button>
			{people?.map((person, idx) => {
				return (
					<div key={idx}>
						<p>First Name: {person.firstName}</p>
						<p>Last Name: {person.lastName}</p>
						{person?.profession && <p>Occupation: {person.profession}</p>}
						<button onClick={() => deletePerson(person.id)}>Delete Person</button>
						<button onClick={(e) => prepareFormForUpdate(e, person.id)}>Update Person</button>
					</div>
				);
			})}
		</div>
	);
};
