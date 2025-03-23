export const generaterandom = (length=4)=>{
    let str =""

    for (let index =0; index < length; index++) {
        str += Math.floor(Math.random() * 10)
        
    }

    return str;
}