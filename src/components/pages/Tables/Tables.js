import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { updateTables } from './redux/tablesRedux';
import { ListGroup } from 'react-bootstrap';
import { fetchTables } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import MiniTable from '../../views/MiniTable/MiniTable';

const Tables = props => {
   const dispatch = useDispatch();
   const tables = useSelector((state) => state.tables);

   console.log(tables);
   useEffect(() => dispatch(fetchTables()), [dispatch]); // dispatch musi być wpisany do tablicy dependancy zapewnie reacta, że funkcja istnieje, funkcja włączy się raz, bo dispatch jest stałą funkcją i się nie zmieni. 

   return (
      <>
         <ListGroup as="ul">
            {tables.map((table) => <MiniTable {...table}></MiniTable>
            )}
            {/* {Teraz zbudować mały komponent który będzie wyświetlał info o każdym z postów tutaj w formie podsumowania i buttonem edycji dla każego (tak jak MiniPost w aplikacji CRUD)} */}
         </ListGroup>
      </>


   );
}

export default Tables;