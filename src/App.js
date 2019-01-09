import React from 'react';
import DevTools from "mobx-react-devtools";
import RootModel from "./models/RootModel";
import Export from "./views/Export";
import StepWizard from "react-step-wizard";
import Upload from "./views/Upload";
import DataGrid from "./views/DataGrid";
import SheetsAndColumns from "./views/SheetsAndColumns";
import Navigator from "./components/NavigatorComps/Navigator";
const ExcelContext = React.createContext(new RootModel());
const App = () => {
    return (
        <div>
            <DevTools/>
            <StepWizard nav={<Navigator/>}>
                <Upload/>
                <SheetsAndColumns/>
                <DataGrid/>
                <Export/>
            </StepWizard>
        </div>

    );
};
export {ExcelContext};
export default App;