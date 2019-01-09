import FileModel from './FileModel';
import SpreadsheetModel from "./SpreadsheetModel";

class RootModel {
    constructor() {
        this.spreadsheet = new SpreadsheetModel(this);
        this.file = new FileModel(this);
    }
}

export default RootModel;