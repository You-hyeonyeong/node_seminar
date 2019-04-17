var d = new Date();
var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 " + d.getSeconds() + "초";

var profile = [ 4, 13, currentTime, "한양대" ];
profile.length = 7;
console.log(profile.length);
profile[5] = "유현영";

console.log(profile);

for(var i in profile){
    console.log(i);
}
