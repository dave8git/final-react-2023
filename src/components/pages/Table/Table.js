import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigator } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';
// import { addTableRequest } from '../../../redux/tablesRedux';

const Table = props => {
   const dispatch = useDispatch(); 
   const { id } = useParams();
   const [table, setTable] = useState('');
   const tableData = useSelector((state) => {
      console.log('state from Table', state);
      console.log('id from Table', id);
      getTableById(state, id );
   });
   console.log('id', id);
   console.log('tableData', tableData);
   // const handleSubmit = e => {
   //    e.preventDefault();
   //    dispatch(() => addTableRequest({table}));
   //    setTable();
   // }

   return (
      <>
         {/* <div>{tableData.id}</div> */}

         {/* <form onSubmit={handleSubmit}>
            Table: <input type="text" value={table} onChange={e => setTable(e.target.value)} />
         </form> */}
      </>


   );
}

export default Table;