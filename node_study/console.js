console.log("그냥 로그찍는거");
console.time('전체시간');
const obj = {
    outside : {
        inside : {
            key : 'value',
        },
    },
};

function a() {
    for(let i = 0; i<3; i++){
        console.dir(obj, {colors : true});
        console.dir(obj, {colors : true, depth: 2});
    
    }
}
a();
console.timeEnd('전체시간');
