import styles from './app.module.scss'
import { AddPersonForm } from './components/addPersonForm';
import { PeopleList } from './components/peopleList';

function App() {
  return (
    <div className={styles.container}>
			<PeopleList />
			<AddPersonForm />
    </div>
  );
}

export default App;
