import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './addPersonForm.module.scss';

export const AddPersonForm = (props) => {
	const { getAllPeople, isUpdating, updateId, setUpdateId, setIsUpdating } = props;
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		profession: '',
	});

	const getPersonById = async () => {
		try {
			const result = await axios.get(`http://localhost:5000/api/people/${updateId}`);
			const { firstName, lastName, profession } = result.data;
			setFormData({
				firstName,
				lastName,
				profession,
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (updateId) {
			getPersonById();
		}
	}, [updateId]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const addPersonToDB = async () => {
		try {
			const result = await axios.post('http://localhost:5000/api/people', {person: formData});
			console.log(result.data);
		} catch (err) {
			console.error(err);
		}
		setFormData({
			firstName: '',
			lastName: '',
			profession: '',
		});
		getAllPeople();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPersonToDB();
	};

	const updatePerson = async (e) => {
		e.preventDefault()
		try {
			const result = await axios.put(`http://localhost:5000/api/people/${updateId}`, {...formData});
		} catch (err) {
			console.error(err)
		}
		setFormData({
			firstName: '',
			lastName: '',
			profession: '',
		});
		setUpdateId(null);
		getAllPeople();
		setIsUpdating(false);
	}

	return (
		<div className={styles.container}>
			<form onSubmit={isUpdating ? updatePerson : handleSubmit}>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					value={formData.firstName}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					value={formData.lastName}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="profession"
					placeholder="Profession"
					value={formData.profession}
					onChange={handleChange}
				/>
				<button type="submit">{isUpdating ? 'Update Person' : 'Add Person'}</button>
			</form>
		</div>
	);
};
