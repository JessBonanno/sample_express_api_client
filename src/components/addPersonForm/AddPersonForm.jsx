import React, { useState } from 'react';
import axios from 'axios';
import styles from './addPersonForm.module.scss';

export const AddPersonForm = () => {
	const [newPerson, setNewPerson] = useState({
		firstName: '',
		lastName: '',
		profession: '',
	})

	const handleChange = (e) => {
		setNewPerson({
			...newPerson,
			[e.target.name]: e.target.value
		})
	}

	const addPersonToDB = async () => {
		try {
			const result = await axios.post('http://localhost:5000/api/people', {person: newPerson});
			console.log(result.data)
		} catch (err) {
			console.error(err)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		addPersonToDB();
	}

	return <div className={styles.container}>
		<form onSubmit={handleSubmit}>
			<input 
				type='text' 
				name='firstName' 
				placeholder='First Name'
				value={newPerson.firstName}
				onChange={handleChange}
			/>
			<input 
				type='text' 
				name='lastName' 
				placeholder='Last Name'
				value={newPerson.lastName}
				onChange={handleChange}
			/>
			<input 
				type='text' 
				name='profession' 
				placeholder='Profession'
				value={newPerson.profession}
				onChange={handleChange}
			/>
			<button type='submit'>Add Person</button>
		</form>
	</div>;
};
