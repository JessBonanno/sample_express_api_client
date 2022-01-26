import React, { useState } from 'react';
import styles from './peopleList.module.scss';
import axios from 'axios';

export const PeopleList = () => {
	const [people, setPeople] = useState([]);

	const getAllPeople = async () => {
		try {
			const result = await axios.get('http://localhost:5000/api/people');
			setPeople(result.data);
		} catch (err) {
			console.error(err);
		}
	};
	console.log({ people });

	return (
		<div className={styles.container}>
			<button onClick={getAllPeople}>Show me the people!</button>
			{people?.map((person, idx) => {
				return (
					<div key={idx}>
						<p>First Name: {person.firstName}</p>
						<p>Last Name: {person.lastName}</p>
						{person?.profession && <p>Occupation: {person.profession}</p>}
					</div>
				);
			})}
		</div>
	);
};
