import lemongrab from '../images/lemongrab.png';

const App = () => {
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
