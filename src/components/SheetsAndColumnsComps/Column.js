import React from "react";
import {ExcelContext} from "../../App";
import {observer} from "mobx-react-lite";
import Checkbox from '@material-ui/core/Checkbox';

const Column = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    const sheet = rootContext.spreadsheet.currentSheet;
    return (
        <div>
            {rootContext.spreadsheet.currentSheet.columns.length>0?
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <ul style={{listStyle: 'none'}} >
                                {sheet.columns.map((header, i) =>
                                    <li key={i}>
                                        <Checkbox defaultChecked={header.checked}
                                                  onChange={(e)=>{sheet.toggleHeaderLines(e.target.checked,i)}}/>
                                        <b className='sheetHeader'>{header.char+" ("+header.headerName})</b>&nbsp;
                                    </li>
                                )}
                             </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
            :
                <div>No headers to show</div>
            }
        </div>
    );
});
export default Column;