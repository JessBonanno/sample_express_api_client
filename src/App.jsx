import styles from './app.module.scss'
import { PeopleList } from './components/peopleList';

function App() {
  return (
    <div className={styles.container}>
			<PeopleList />
    </div>
  );
}

export default App;
