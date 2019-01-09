import {computed, observable, action} from "mobx";
import SheetModel from "./SheetModel";

class SpreadsheetModel {
    constructor(root) {
        this.root = root;
    }

    @observable workbook = null;
    @observable sheets = [];
    @observable currentSheetIndex = null;
    @observable hasBeenEdited = false;
    @computed get currentSheet(){
        return this.sheets[this.currentSheetIndex];
    }
    //@observable validSheetNames = [];

    @action initSpreadsheet = (wb)=>{
        var me = this;
        wb.SheetNames.map(function (name,index) { me.sheets.push(new SheetModel(me.root,name,index,wb.Sheets[name]))});
        this.setCurrentSheetIndex(0);
        this.setWorkbook(wb);
    };

    @action setWorkbook = (wb) => {
        this.workbook = wb;
    };
    @action setCurrentSheetIndex = (index) => {
        this.currentSheetIndex = index;
    };
}

export default SpreadsheetModel;