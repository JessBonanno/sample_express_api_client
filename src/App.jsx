import axios from 'axios';
import { useState } from 'react';
import styles from './app.module.scss';
import { AddPersonForm } from './components/addPersonForm';
import { PeopleList } from './components/peopleList';

function App() {
	const [people, setPeople] = useState([]);
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateId, setUpdateId] = useState(null);


	const prepareFormForUpdate = async (e, id) => {
		e.preventDefault();
		setIsUpdating(true);
		setUpdateId(id);
	};

	const getAllPeople = async () => {
		try {
			const result = await axios.get('http://localhost:5000/api/people');
			setPeople(result.data);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className={styles.container}>
			<PeopleList 
			getAllPeople={getAllPeople} 
			people={people} 
			prepareFormForUpdate={prepareFormForUpdate}
			/>
			<AddPersonForm 
			getAllPeople={getAllPeople} 
			isUpdating={isUpdating} 
			setIsUpdating={setIsUpdating} 
			updateId={updateId}
			setUpdateId={setUpdateId}
			/>
		</div>
	);
}

export default App;
