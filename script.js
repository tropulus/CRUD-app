
/*
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("changeThis").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/pingserver", true);
  xhttp.send();
} */
loadDoc2(1);

setTimeout(() => {
let master = document.getElementsByClassName('master')[0];
let peasant = document.getElementsByClassName('peasant');
master.addEventListener('change', () => {
    for (let i = 0; i < peasant.length; i++){
      peasant[i].checked = master.checked;
    }
})


},1000)

function fireEmployee() {

    index = document.getElementsByClassName('next')[0].name

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
  loadDoc2(index);
}

function edit(element){
  let parent = element.parentElement.parentElement;
  let parent3 = ""
  let parent2 = parent.childNodes.forEach((element) => {
    parent3 += "" + element.textContent + ",";
  })
  parent3 = parent3.split(",")[1]
  $("#update").
  append('<input type="hidden" name="oldata" value="' + parent3 + '">')

  let color = Array.from(document.getElementsByClassName("row")).indexOf(parent)
  parent.style.background = "#FFE4C4";
  document.getElementsByClassName('edit')[0].style.display = "block"

  document.getElementsByName('firstName')[0].value   = parent.childNodes[1].textContent.split(" ")[0]
  document.getElementsByName('lastName')[0].value    = parent.childNodes[1].textContent.split(" ")[1]
  document.getElementsByName('address')[0].value     = parent.childNodes[2].textContent
  document.getElementsByName('email')[0].value       = parent.childNodes[3].textContent
  document.getElementsByName('phoneNumber')[0].value = parent.childNodes[4].textContent

  editCompleted(parent,color)
}

async function editCompleted(parent, color){
  let promise = new Promise((resolve, reject) => {
    document.getElementsByName("wait")[0].addEventListener('click', () => {
      resolve()
    })
  });
  await promise;
  parent.childNodes[1].textContent = "" + document.getElementsByName('firstName')[0].value + " " + document.getElementsByName('lastName')[0].value + ""
  parent.childNodes[2].textContent = "" + document.getElementsByName('address')[0].value
  parent.childNodes[3].textContent = "" + document.getElementsByName('email')[0].value
  parent.childNodes[4].textContent = "" + document.getElementsByName('phoneNumber')[0].value


  document.getElementsByClassName('edit')[0].style.display = "none"
  if (color % 2 != 0){
    parent.style.background = "#f2f2f2";
  } else {
    parent.style.background = "white";
  }
}

// $('#update').submit(() => {
//   return false
// })

function loadDoc2(index) {

    document.getElementsByClassName('master')[0].checked = false;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("changeThis").innerHTML = this.responseText;
            //changes the table
        }
    };

    let i = index;
    let paragraph = "Showing " + (1 + (5 * (i - 1))) + " - " + (5 * i) + " of 25" 
    if (index >= 1 && index <= 5) {
        document.getElementsByClassName('next')[0].name = index
        document.getElementsByClassName('previous')[0].name = index

        document.getElementById("ptag").textContent = paragraph;

        xhttp.open("POST", "/update2", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(index);
    } else {
        console.log("error: outside range")
    }

    
}