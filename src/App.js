import { Routes, Route } from 'react-router-dom';
import Tables from './components/pages/Tables/Tables';
import Table from './components/pages/Table/Table';
import NotFound from './components/views/NotFound/NotFound';
import { updateTables } from './redux/tablesRedux';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();


  useEffect(() => dispatch(fetchTables()), [dispatch]); // dispatch musi być wpisany do tablicy dependancy zapewnie reacta, że funkcja istnieje, funkcja włączy się raz, bo dispatch jest stałą funkcją i się nie zmieni. 

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
