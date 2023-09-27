import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import AnimatedRoutes from 'Routes';

function App() {
  return (
    <Provider store={store}>
        <Router>
            <AnimatedRoutes/>
        </Router>
      </Provider>
  );
}

export default App;
