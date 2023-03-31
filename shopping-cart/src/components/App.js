import lemongrab from '../images/lemongrab.png';

const App = () => {
  return (
    <div id="app-container">
      <div className='img-container'>
        <img src={lemongrab} alt="The Earl of Lemongrab, a yellow lemon humanoid"/>
      </div>
      <b>Hmmm don't buy my things</b>
    </div>
  );
}

export default App;
