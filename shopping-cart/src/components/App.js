import lemongrab from '../images/lemongrab.png';
import {useEffect} from 'react';

const App = ({setCurrRoute}) => {
  useEffect(()=> {
    setCurrRoute("App");
  }, []);
  return (
    <div id="app-container">
      <div className='img-container'>
        <img src={lemongrab} alt="The Earl of Lemongrab, a yellow lemon humanoid"/>
      </div>
      <h3>Hmmm don't buy my things</h3>
    </div>
  );
}

export default App;
