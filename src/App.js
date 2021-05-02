import Route from './configs/router/MainRoute'
import { Provider} from 'react-redux'
import store from './configs/redux/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <Route />
      </Provider>
    </>
  );
}

export default App;
