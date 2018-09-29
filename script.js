'use strict';

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("changeThis").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/pingserver", true);
  xhttp.send();

}
loadDoc();

setTimeout(() => {
let master = document.getElementsByClassName('master')[0];
let peasant = document.getElementsByClassName('peasant');
master.addEventListener('change', () => {
    for (let i = 0; i < peasant.length; i++){
      peasant[i].checked = master.checked;
    }
})


},1000)

function fireEmployee(){
  let peasant = document.getElementsByClassName('peasant');
  let fire = "";
  for (let i = 0; i<peasant.length; i++){
    if (peasant[i].checked){
      fire += document.getElementsByClassName("row")[i].childNodes[1].textContent + ",";
    }
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("changeThis").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/delete", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(fire);
  loadDoc();
}
