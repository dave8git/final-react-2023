//selectors
export const getTableById = (state , tableId) => state.tables.find((table) => table.id == tableId);


// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });
export const fetchTables = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    }
};


export const addTableRequest = (table) => {
    return (dispatch) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(table),
        };

        fetch('http://localhost:3131/api/tables/'+table.id, options)
            .then(() => dispatch(updateTable(table)))
    }
}

const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case UPDATE_TABLES:
            return [...action.payload];

        case UPDATE_TABLE:
            return statePart.map((table) => {
                if(table.id === action.payload.id) {
                    return action.payload;
                } else {
                    return table;
                }
            })
        default:
            return statePart;
    };
};

export default tablesReducer;