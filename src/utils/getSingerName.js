const getSingerName = (arr)=>{
    return arr.map((item,index)=>item.name).join(',')
}

export default getSingerName