import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import {observer} from "mobx-react-lite";
import 'react-toastify/dist/ReactToastify.css';
import {ExcelContext} from "../App";

const Export = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    const sheet = rootContext.spreadsheet.currentSheet;
    return (
        <div>
            <div className='saveAndExportDiv' style={{display:'block'}}>
                    <span className='finishedSpan'>
                        <button
                            style={{opacity:0}}
                            onClick={()=>{toast(<i className="fas fa-check"></i>)}}
                        >Notify !</button>
                        <center>
                            <ToastContainer
                                position="top-center"
                                autoClose={false}
                                transition={Zoom}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick= {false}
                                rtl={false}
                                pauseOnVisibilityChange= {false}
                                draggable= {false}
                                pauseOnHover= {false}
                            />
                        </center>
                    </span>
                <center style={{marginTop:'150px'}}>
                    <button className={'nextButton'} style={{backgroundColor:'blue'}} onClick={()=>{sheet.downloadSheet()}}>download</button>
                    <button
                        className={'nextButton'}
                        onClick={(e)=>{window.location.reload()}}
                    >Run the service again</button>
                </center>
            </div>
        </div>
    );
});

export default Export;