import './App.css';
import lemongrab from '../images/lemongrab.png'

const App = () => {
  return (
    <div id="app-container">
      <div className='imgContainer'>
        <img src={lemongrab} alt="The earl of Lemongrab, a yellow lemon humanoid"/>
      </div>
      <h3>Hmmm don't buy my stuff</h3>
    </div>
  );
}

export default App;
