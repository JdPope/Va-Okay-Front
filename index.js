const vacationURL = "http://localhost:3000/vacations"
const userNames = "http://localhost:3000/users"
const eventNames = "http://localhost:3000/events"

let userId = ""
let vacationId = ""

const ulwel = document.querySelector(".welcome")
const ul =  document.querySelector(".vacations")
const ulvac = document.querySelector(".vacationdata")
const dropDown = document.querySelector(".dropdown-content")
const alpha = document.querySelector(".alpha")
const huser = document.querySelector(".usertitle")
const hvacation = document.querySelector(".vacationname")
const userPage = document.querySelector('.userpage')
const welcomePage = document.querySelector('.welcomepage')
const vacationPage = document.querySelector('.vacationpage')
const returningUserButton = document.querySelector('.returninguser')
const addRowButton = document.querySelector("#add-row")
const submitNewRowButton = document.querySelector("#submitRow")
const homeButton = document.querySelector(".home")
const calculate = document.querySelector("#calculate")

welcome()
fetchUserNames()

  function welcome(){
    vacationPage.style.display = "none";
    userPage.style.display = "none";
    welcomePage.style.display = "block";
  }

  function fetchUserNames(){
    fetch(userNames)
      .then(response => response.json())
        .then(response => {
          response.forEach(function(ce){
            li = document.createElement('li')
            li.textContent = ce.name
            li.addEventListener("click", function(e){
              fetchUser(ce.id)
            })
          dropDown.appendChild(li)
          })
        })
    }

    function fetchUser(userId){
      welcomePage.style.display = "none";
      vacationPage.style.display = "none";
      userPage.style.display = "none";
      userPage.style.display = "block";
      const userShow = `http://localhost:3000/users/${userId}`
          fetch(userShow)
            .then(response => response.json())
            .then(response => {
              response.vacations.map(function(ec){
                vacationId = ec.id
                liea = document.createElement('li')
                liea.textContent = ec.name
                liea.addEventListener("click", function(e){
                  fetchVacation(ec.id, ec.name)
                })
                ul.appendChild(liea)
              })
            })
    }

    function fetchVacation(vacationId,relVacName){
      vacationPage.style.display = "block";
      userPage.style.display = "none";
      welcomePage.style.display = "none";
      vacationPage.style.display = "block";
      hvacation.innerText = `${relVacName} Expense Log`
      const vacationShow = `http://localhost:3000/vacations/${vacationId}`
      return fetch(vacationShow)
        .then(response => response.json())
        .then(response => {
          const table = new Tabulator("#example-table", {
         	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
         	data:response.events, //assign data to table
         	layout:"fitColumns", //fit columns to width of table (optional)
         	columns:[ //Define Table Columns
        	 	{title:"Name", field:"name", width:500, editor:"textarea"},
        	 	{title:"Amount", field:"amount", width:150, editor:"number"},
            {title:"User", field:"user_id", width:150, editor:"number"},
        	 	{title:"Category", field:"category", width:200, editor:"textarea"},
        	 	{title:"Date Of Event", field:"date_of_event", width:200, editor:"textarea", sorter:"date", align:"center"},
            {title:"VacId", field:"vacation_id", width:100, editor:"number"},
            {formatter:"buttonCross", align:"center", width:100, title:"del", headerSort:false, cellClick:function(e, cell){
	             if(confirm('Are you sure you want to delete this entry?'))
		             cell.getRow().delete();
	              }
            }
         	],
        })
        submitNewRowButton.addEventListener('click',function(){
          let myData = table.getData()
          for(row of myData) {
            if ( "id" in row ){
              let rowId = row.id
              delete row.id
              delete row.created_at
              delete row.updated_at
              fetch(`http://localhost:3000/events/${rowId}`,{
                method: 'PUT',
                body: JSON.stringify(row),
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                         }
              })
            } else {
               fetch("http://localhost:3000/events",{
                 method: 'POST',
                 body: JSON.stringify(row),
                 headers:{
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                          }
               })
              }
          }
         })
         addRowButton.addEventListener('click', function(){
           table.addRow({vacationId:1})
         })
       })
    }

    calculate.addEventListener('click', function(){
      calculator()
    })
    homeButton.addEventListener('click',function(){
      welcome()
    })
    calculate.addEventListener('click', function(){
      calculator()
    })
    function calculator(){
      const total = myData.amount.reduce(function(count, price){
      count += price
    },0)
    return total
    }
