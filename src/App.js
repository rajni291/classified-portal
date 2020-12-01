import UserProvider from './core/providers/UserProvider';
import Home from './home/Home';
import HomeWrapper from './home/HomeWrapper';


function App() {
  return (
    <div className="App">
    <UserProvider>
    <HomeWrapper/>
    </UserProvider>

    </div>
  );
}

export default App;
