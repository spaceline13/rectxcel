import React from "react";
import {ExcelContext} from "../App";
import {observer} from "mobx-react-lite";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Column from '../components/SheetsAndColumnsComps/Column';

const SheetsAndColumns = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    return (
        <div>
            <div  className='sheetSelection'>
                {rootContext.file.fileLoaded?
                    <div>
                        {rootContext.spreadsheet.sheets.length > 0 ?
                            <div className="modelArea">
                                <Tabs style={rootContext.spreadsheet.currentSheet.exportProgress == 0 ? {opacity: '1'} : {opacity: '0.1'}}
                                      onSelect={(index, lastIndex) => {
                                          rootContext.spreadsheet.setCurrentSheetIndex(index);
                                      }}>
                                    <TabList>
                                        {rootContext.spreadsheet.sheets.map((sheet, i) =>
                                            <Tab key={i}>{sheet.label}
                                                <i className="far fa-file" style={{marginLeft: '8px'}}></i>
                                            </Tab>
                                        )}
                                    </TabList>
                                    {rootContext.spreadsheet.sheets.map((sheet, i) =>
                                        <TabPanel key={i}>
                                            <div className={'colname'}>Column name</div>
                                            <Column/>
                                        </TabPanel>
                                    )}
                                </Tabs>
                            </div>
                        :
                            <div>Loading file...</div>
                        }

                    </div>
                :
                    <div></div>
                }
            </div>

            <button onClick={()=>{props.nextStep()}}>next</button>
        </div>
    );
});

export default SheetsAndColumns;