import second_format from "second-format"
import {numberFormat} from "js-num-format"
import moment from "moment";

// console.log(second_format(232))
// console.log(numberFormat(22000000033333))
export const timeFormat =  second_format
export const numFormat =  numberFormat

export  const toDate = (v,format)=>{
    return moment(v).format(format || 'YYYY-MM-DD HH:mm:ss')
}