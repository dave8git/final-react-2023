import { Routes, Route } from 'react-router-dom';
import Tables from './components/pages/Tables/Tables';
import Table from './components/pages/Table/Table';
import NotFound from './components/views/NotFound/NotFound';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Tables />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
