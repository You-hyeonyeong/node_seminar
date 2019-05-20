const db = require('./pool')
const dbModules = {
    // selectUser : async(inputId, whereJson) => {
    //     let value = ""
    //     for(let key in whereJson){
    //         const value = `${key} = '${whereJson[key]}'`
    //         conditions = `${value},${condition}`
    //     }
    //     value = value.substring(1);
    //     const selectQuery = `SELECT FROM ${table} WHERE ${value}`
    //     const dbId = await db.queryParam_Parse(selectQuery, value)
    // }
}

module.exports = dbModules;