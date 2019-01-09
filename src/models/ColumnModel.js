import {computed, observable,action} from "mobx";

class ColumnModel {
    constructor(header,index){
        var me = this;
        //header.map(function (prop,index) { me[index] = prop });
        Object.keys(header).map(function(key, index) {
            me[key] = header[key];
        });
        me.index = index;
        console.log(header);
    }
    @observable index;
    @observable headerName;
    @observable field;
    @observable editable;
    @observable checked = false;

    @computed get char (){
        return this.getNameFromNumber(this.index+1);
    }
    getNameFromNumber(num) {
        var numeric = (num - 1) % 26;
        var letter = String.fromCharCode(65 + numeric);
        var num2 = parseInt((num - 1) / 26);
        if (num2 > 0) {
            return this.getNameFromNumber(num2) + letter;
        } else {
            return letter;
        }
    }
}

export default ColumnModel;