import './styles/App.css';
import { AddressModal } from '../features/addressModal/components/AddressModal';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <main>
          <AddressModal />
        </main>
      </header>
    </div>
  );
}

export default App;
