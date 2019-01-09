import {action, computed, observable} from "mobx";
import XLSX from 'xlsx';

class FileModel{
    constructor(root){
        this.root = root;
    }

    @observable originalFile = null;

    @computed get fileLoaded(){
        return this.root.spreadsheet.workbook!=null;
    }
    @action setOriginalFile = (file) => {
        this.originalFile = file;
    };
    @action openFile = (file)=>{
        this.setOriginalFile(file);

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const excelfile = e.target.result;
            const wb = XLSX.read(excelfile, {type:rABS ? 'binary' : 'array'});

            this.root.spreadsheet.initSpreadsheet(wb);
        };
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };
}

export default FileModel;