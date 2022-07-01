import './assets/css/main.css';
import Header from './components/header.js'
import RecipePage from './components/recipePage.js'

import pages from './pages/index.js'


import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

function App() {
    return (
        <Router>
        
        <Routes>
            <Route exact path='/' exact element={<pages.Recipe />} />
            <Route path='/recipe' element={<pages.Recipe/>} />
            <Route path='/login' element={<pages.Login/>} />
            <Route path='/register' element={<pages.Register/>} />
        </Routes>
        </Router>
    );
}

export default App;
