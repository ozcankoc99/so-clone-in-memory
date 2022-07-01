import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { usersAtom } from "_state";
import { useUserActions } from "_actions";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

export { List };

function List({ match }) {
  const { path } = match;
  const users = useRecoilValue(usersAtom);
  const userActions = useUserActions();

  useEffect(() => {
    userActions.getAll();

    return userActions.resetUsers;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const gridRef = useRef(); // Optional - for accessing Grid's API

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", checkboxSelection: true },
    { field: "firstName" },
    { field: "lastName" },
    { field: "username" },
  ]);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      <h1>Servisler</h1>
      <div
        class="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
            Servis Ekle
          </Link>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            className="btn btn-sm btn-secondary mb-2"
            onClick={buttonListener}
          >
            Seçimi kaldır
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={users} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          rowHeight="25"
        />
      </div>
    </div>
  );
}
