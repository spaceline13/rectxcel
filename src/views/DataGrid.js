import React, {Component} from 'react';
import {observer} from "mobx-react-lite";
import {ExcelContext} from "../App";
import { AgGridReact } from 'ag-grid-react';

const DataGrid = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    const sheet = rootContext.spreadsheet.currentSheet;
    var gridApi = null;
    const onGridReady = function(params){
        gridApi = params.api;
        console.log(sheet.columns,'timos');
    };
    return (
        <div>
            <div
                className="ag-theme-balham"
                style={{
                    height: '60vh',
                    width: '100%'}}
            >
                <div className={'infobox-preview'}>TEXT </div>

                <AgGridReact
                    onGridReady={onGridReady}
                    columnDefs={sheet.checkedColumns}
                    rowData={sheet.arrayData}
                    enableColResize={true}>
                </AgGridReact>
            </div>
            <div style={{marginTop:'50px'}}>
                <button onClick={()=>{props.previousStep()}}>back</button>
                <button onClick={()=>{props.nextStep()}}>next</button>
            </div>
        </div>
    );
});

export default DataGrid;