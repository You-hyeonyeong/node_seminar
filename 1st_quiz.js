//1번
var profile = {
    name: "유현영",
    age: 23,
    school: "용인대",
    department: "컴퓨터과학과",
    birthM: 10,
    birthD: 10
}
var quiz = (obj) => {
    for (key in obj) {
        console.log(key + ":" + obj[key]);
    }
    console.log(`제 생일은 ${obj.birthM}월${obj.birthD}일 입니다.`)
}
quiz(profile);

//2번
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
for (var i = 0; i < arr.length; i++) {
    if (arr[i] == profile.birthM + 1)  console.log(i);
}

//1 1 5 1 1  배열에 있는( 내장함수 통해서 유니크한값

var number = [1, 1, 5, 1, 1];
for (var i = 0; arr.length; i++) {
    while (!number[i]) console.log(i);
}
