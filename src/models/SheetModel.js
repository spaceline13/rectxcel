import {computed, observable,action} from "mobx";
import ColumnModel from "./ColumnModel";
import XLSX from 'xlsx';

class SheetModel {
    constructor(root,name,index,contents){
        var me = this;
        this.root = root;
        this.name = name;
        this.index = index;
        this.contents = XLSX.utils.sheet_to_json(contents, {header:1});
        var headers = getHeaders(this.contents,null,me);
        headers.map(function (header,index) { me.columns.push(new ColumnModel(header,index)) }); //columns
    }
    @observable name;
    @observable index;
    @observable contents;
    @observable columns = [];
    @observable exportProgress = 0;

    @computed get checkedColumns(){
        return this.columns.filter(function(column){ return column.checked });
    }
    // some third party components need the .label prop to work, that's why we make this computed
    @computed get label(){
        return this.name;
    }
    @computed get arrayData(){
        var out = [];
        var curRow = [];
        var columns = this.columns;
        var data = this.contents;
        if(columns.length>0) {
            for (var i = 1; i < data.length; i++) {
                curRow = {};
                var count = 0;
                data[i].forEach(function (d) {
                    if(columns[count].checked)
                        curRow[columns[count].field] = d;
                    /*if(parent&&((!d)||(d==''))){  //GLOBAL EMPTY FIELDS INIT
                        globalEmpty++;
                    }*/
                    count++;
                });
                if (curRow != {}) {
                    out.push(curRow);
                }
            }
        }
        return out;
    }

    @action changeMainDataArray(row,col,value){
        this.contents[row][col] = value;
    }
    @action toggleHeaderLines = (checked,i)=>{
        if(checked){
            this.columns[i].checked = true;
        }else{
            this.columns[i].checked = false;
        }
    };
    @action downloadSheet(){
        XLSX.writeFile({ SheetNames:[this.name], Sheets:{[this.name]:XLSX.utils.aoa_to_sheet(formatDataForXLSX(this.checkedColumns,this.arrayData))}}, this.root.file.originalFile.name+'_exported.xlsx');
    }
}
function getHeaders(input, opt, sheet){
    var output = [];
    var fieldCount = 0;
    var curHeader = {};
    var options = opt?opt:[];
    var curOpt = null;
    if(input.length>0){
        var data = input[0];
        for(var i=0;i<data.length;i++){
            curOpt = options[i];
            curHeader={
                headerName: data[i],
                field: curOpt&&curOpt.field?curOpt.field:"field"+fieldCount++,
                editable:true,
                currentAction:curOpt&&curOpt.currentAction?curOpt.currentAction:'',
                currentFormat:options[i]&&options[i].currentFormat?options[i].currentFormat:'',
                isURL:options[i]&&options[i].isURL?options[i].isURL:false,
                onCellValueChanged : function({api,colDef,column,columnApi,context,data,newValue,node,oldValue}) {
                    //api.setFocusedCell(0, colDef.headerName);
                    sheet.changeMainDataArray(node.rowIndex+1,colDef.index,newValue);
                },
                cellClassRules: options[i]?{
                    'rag-white-outer': function(params) { return false },
                    'rag-red-outer': function(params) { return false },//(!validator(params.colDef.currentFormat,params.value)) },
                    'rag-yellow-outer': function(params) { return false }//(params.value=='')||(!params.value) }
                }:{},
                cellRenderer: function(params) {
                    //empty field
                    if((params.value=='')||(!params.value)){
                        return '<span class="rag-element">Warning: Empty field!</span>';
                        //url
                    } else if(params.colDef.isURL && (params.value!='not valid!')){
                        return '<a target="_blank" rel="noopener noreferrer" class="rag-element" href=\"'+params.value+'\">'+params.value+'</a>';
                        //regular
                    } else {
                        return '<span class="rag-element">'+params.value+'</span>';
                    }
                }
            };
            output.push(curHeader);
        }
    }
    return output;
}
function formatDataForXLSX(columnDefs,rowData){
    var curRow = [];
    var output = [];
    columnDefs.forEach(column=>{
        curRow.push(column.headerName);
    })
    output.push(curRow);
    rowData.forEach(row=>{
        curRow = [];
        for(var col in row){
            curRow.push(row[col]);
        }
        output.push(curRow);
    });
    return output;
}
//can be used on cellClassRules on header constructor
function validator(format,value){
    var isValid = true;
    if(format=='latitude'){
        isValid = /^(-?[1-8]?\d(?:(\.|\,)\d{1,18})?|90(?:\.0{1,18})?)$/.test(value);
    } else if (format=='longtitude'){
        isValid = /^(-?(?:1[0-7]|[1-9])?\d(?:(\.|\,)\d{1,18})?|180(?:\.0{1,18})?)$/.test(value);
    } else if (format=='latclng'){
        isValid = /^((-?[1-8]?\d(?:(\.|\,)\d{1,18})?|90(?:\.0{1,18})?)+(\, )+(-?(?:1[0-7]|[1-9])?\d(?:(\.|\,)\d{1,18})?|180(?:\.0{1,18})?))$/.test(value);
    } else if (format=='latlng'){
        isValid = /^((-?[1-8]?\d(?:(\.|\,)\d{1,18})?|90(?:\.0{1,18})?)+( )+(-?(?:1[0-7]|[1-9])?\d(?:(\.|\,)\d{1,18})?|180(?:\.0{1,18})?))$/.test(value);
    }
    return isValid;
}
export default SheetModel;