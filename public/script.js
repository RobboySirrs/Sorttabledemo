const table = document.getElementById("customers");
const thsort = table.querySelectorAll("th");
let trs = table.querySelectorAll("tr:not(:first-child)");
let params = new URLSearchParams(document.location.search);
let currentSort = params.get("sort");
var value = params.get("filter");

//Red ut var som är DESC OCH ASC
///lägg till kommentrarer

if (params.get("sort")) {
  let currentSort2 = params.get("sort").split("-");
  for (var i = 0; i < thsort.length; i++) {
    if (thsort[i].textContent == currentSort2[0]) {
      if (thsort[i].dataset.type === "number") {
        if (currentSort2[1] === "DESC") {
          var element = document.createElement("i");
          element.classList.add("down");
          element.classList.add("arrow");
          thsort[i].appendChild(element);

          Array.from(trs)
            .sort((a, b) => b.cells[i].innerHTML - a.cells[i].innerHTML)
            .forEach((tr) => table.appendChild(tr));
          break;
        } else {
          var element = document.createElement("i");
          element.classList.add("up");
          element.classList.add("arrow");
          thsort[i].appendChild(element);
          Array.from(trs)
            .sort((a, b) => a.cells[i].innerHTML - b.cells[i].innerHTML)
            .forEach((tr) => table.appendChild(tr));
          break;
        }
      }

      if (currentSort2[1] === "DESC") {
        var element = document.createElement("i");
        element.classList.add("down");
        element.classList.add("arrow");
        thsort[i].appendChild(element);

        Array.from(trs)
          .sort((a, b) =>
            a.cells[i].textContent.toLowerCase() <
            b.cells[i].textContent.toLowerCase()
              ? 1
              : -1
          )
          .forEach((tr) => table.appendChild(tr));
        break;
      } else {
        var element = document.createElement("i");
        element.classList.add("up");
        element.classList.add("arrow");
        thsort[i].appendChild(element);
        Array.from(trs)
          .sort((a, b) =>
            a.cells[i].textContent.toLowerCase() >
            b.cells[i].textContent.toLowerCase()
              ? 1
              : -1
          )
          .forEach((tr) => table.appendChild(tr));
        break;
      }
    }
  }
}

//kan man välja denna utan en ny QuerS?
const th = table.querySelectorAll("th:not(.nosort)");

function nosort() {
  params.delete("sort", "");
  window.location.search = params.toString();
}

th.forEach((element) => {
  element.addEventListener("click", function () {
    const order = element.textContent;
    if (currentSort == order + "-ASC") {
      params.set("sort", order + "-DESC");
      window.location.search = params.toString();
    } else {
      params.set("sort", order + "-ASC");
      window.location.search = params.toString();
    }
  });
});

///FILTER FREE TEXT
function myFunction2() {
  const all = document.getElementById("all");
  all.checked = false;

  checkAll();
  radio();

  var option = [];
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();

  //let checkbox = document.getElementsByName("id");

  for (i = 0; i < trs.length; i++) {
    var hitta = 0;
    let td = trs[i].querySelectorAll("td");

    for (j = 0; j < td.length; j++) {
      txtValue = td[j].textContent || td[j].innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        hitta = +1;
      } else {
      }

      if (j == td.length - 1) {
        let checkBox = trs[i].querySelector("input");
        if (hitta == 0) {
          trs[i].style.display = "none";
        } else {
          trs[i].style.display = "";
        }
      }
    }
  }
}

const apa = document.getElementById("dynamic_select");
if (value !== null || value == "") {
  apa.value = value;
}
apa.addEventListener("change", function () {
  //this function does stuff
  // Set new or modify existing parameter value.

  var value = apa.value;
  params.set("filter", value);
  window.location.search = params.toString();
});
//HÅLLET PÅ HÄR

function radio() {
  let checkbox = table.querySelectorAll(
    'tr:not([style*="display: none"])  input[id="checkbox"]'
  );

  const radioButtons2 = table.querySelectorAll('input[id="checkbox"]:checked');
  if (radioButtons2.length == checkbox.length) {
    const all = document.getElementById("all");
    all.checked = true;
  }
  document.getElementById("btn").textContent =
    "Delete selected (" + radioButtons2.length + ")";
  if (radioButtons2.length === 0) {
    document.getElementById("btn").disabled = true;
    document.getElementById("btn").textContent = "Delete selected";
    all.checked = false;
  } else {
    document.getElementById("btn").disabled = false;
  }
}

//Markera ALLA
const checkAll = () => {
  const checkbox = table.querySelectorAll(
    'tr:not([style*="display: none"])  input'
  );

  //var x = document.getElementById("all").checked;
  if (checkbox[0].checked == true) {
    checkbox.forEach((element) => {
      element.checked = true;
    });
  } else {
    checkbox.forEach((element) => {
      element.checked = false;
    });
  }
};

const deleteSingle = (a) => {
  document.getElementById(a).style.display = "none";
  document.getElementById(`yes` + `${a}`).style.display = "inline-block";
  document.getElementById(`no` + `${a}`).style.display = "inline-block";
};
const confirmDelete = (a, id) => {
  if (a == "yes") {
    deletePost(id);
    return;
  }

  document.getElementById(`yes` + `${id}`).style.display = "none";
  document.getElementById(`no` + `${id}`).style.display = "none";
  document.getElementById(id).style.display = "inline-block";
};

//	<button id="btn" type="button" onclick="confirmAction('<% for(var i=0; i <test.length; i++) {%><%= test[i]._id %>,<% } %>');">Delete all</button>

document.getElementById("input").onkeypress = function (e) {
  if (e.key === "Enter") {
    addPost();
  }
};

const input = document.getElementById("input");
const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");

let antal = "id" + Math.random().toString(16).slice(2);
var array = ["hello", "world", "korv"];
var index = Math.floor(Math.random() * array.length);
var chosenText = array[index];

const btn = document.querySelector("#yesbtn");
if (btn !== null) {
  const radioButtons = document.querySelectorAll('input[name="id"]');
  btn.addEventListener("click", () => {
    let selectedSize = "";
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedSize += radioButton.value + ",";
      }
    }
    // show the output:
    confirmDelete(`yes`, `${selectedSize}`);
  });

  //CHECKBOXES DISblE SUbMit BuTToN
  const checkBoxes = document.querySelectorAll(
    'input[identifier="my-custom-identifier"]'
  );
  const submitButton = document.getElementById("btn");
  checkBoxes.forEach((cb) => {
    cb.addEventListener("change", checkButtonStatus);
  });
  function checkButtonStatus() {
    const checkedCount = [...checkBoxes].filter((cb) => cb.checked);
    //submitButton.disabled = checkedCount.length === 0
  }
  checkButtonStatus();
}

async function deletePost(a) {
  const res = await fetch(`/korv/${a}`, {
    method: "DELETE",
  });

  //  hittaPost();
  location.reload();
}

async function addPost() {
  const res = await fetch(`/korv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: input.value,
      _id: antal,
      vad: chosenText,
    }),
  });
  antal = "id" + Math.random().toString(16).slice(2);
  index = Math.floor(Math.random() * array.length);
  location.reload();
  //hittaPost();         console.log(data)
}

/*      function money ()
{
	document.getElementById("1").style.display = "none";
  document.getElementById("yes").style.display = "inline-block";
  document.getElementById("no").style.display = "inline-block";
}

function cash ()
{
	document.getElementById("1").style.display = "block";
  document.getElementById("yes").style.display = "none";
  document.getElementById("no").style.display = "none";
} */
