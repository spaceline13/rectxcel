import React from 'react';
import DragDropFile from '../components/UploadComps/DragDropFile';
import DataInput from '../components/UploadComps/DataInput';
import {observer} from "mobx-react-lite";
import {ExcelContext} from "../App";

const Upload = observer((props)=> {
    const rootContext = React.useContext(ExcelContext);
    return (
        <div>
            <p className='uploadComponentText'>Please Upload your spreadsheet (xls, xlsx or csv) and make sure that all the columns have a name in the first row. Please NOTE that the service will not work correctly if there are no names for the columns in the first row of your file. The max size of the file is 10MB</p>
            <DragDropFile handleFile={(file)=>{rootContext.file.openFile(file); props.nextStep();}}>
                <p className='dragDropText2'> or click on the button to browse local files:</p>
                <DataInput handleFile={(file)=>{rootContext.file.openFile(file); props.nextStep();}}/>
            </DragDropFile>
        </div>
    );
});

export default Upload;