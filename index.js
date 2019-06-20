let userId = ""
let vacationId = ""
const vacationURL = "http://localhost:3000/vacations"
const userNames = "http://localhost:3000/users"
const eventNames = "http://localhost:3000/events"

const ulwel = document.querySelector(".welcome")
const ul =  document.querySelector(".vacations")
const ulvac = document.querySelector(".vacationdata")
const dropDown = document.querySelector(".dropdown-content")

const huser = document.querySelector(".usertitle")
const hvacation = document.querySelector(".vacationname")
const userPage = document.querySelector('.userpage')
const welcomePage = document.querySelector('.welcomepage')
const vacationPage = document.querySelector('.vacationpage')
const returningUserButton = document.querySelector('.returninguser')
const addRowButton = document.querySelector("#add-row")
const submitNewRowButton = document.querySelector("#submitRow")

// fetchVacationNames()
// fetchVacation1()
// fetchUserNames()
// fetchUser1()
// fetchEvents()
fetchUserNames()

// returningUserButton.addEventListener("click", function(e){
//   fetchUserNames()
// })


    function fetchUserNames(){
        return fetch(userNames)
        .then(response => response.json())
        .then(response => {
          response.map(function(ce){
          userId = ce.id
          li = document.createElement('li')
          li.textContent = ce.name
          li.addEventListener("click", function(e){
            fetchUser()
          })
          dropDown.appendChild(li)
        })
      })
    }

    function fetchUser(){
      welcomePage.innerHTML = userPage
      huser.innerText = "Your Vacations!"
      const userShow = `http://localhost:3000/users/${userId}`
        return fetch(userShow)
        .then(response => response.json())
        .then(response => {
          response.vacations.map(function(e){
          vacationId = e.id
          liea = document.createElement('li')
          liea.textContent = e.name
          liea.addEventListener("click", function(e){
            fetchVacation()
          })
          ul.appendChild(liea)
          })
          })
        }

function fetchVacation(){
  userPage.innerHTML = vacationPage
  hvacation.innerText = "This is the vacation data page!"
  addRowButton.innerText = "Add Row"
    const vacationShow = "http://localhost:3000/vacations/1"
      return fetch(vacationShow)
      .then(response => response.json())
      .then(response => {
        console.log(response.events)
        const table = new Tabulator("#example-table", {
         	height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
         	data:response.events, //assign data to table
         	layout:"fitColumns", //fit columns to width of table (optional)
         	columns:[ //Define Table Columns
        	 	{title:"Name", field:"name", width:150, editor:"textarea"},
        	 	{title:"Amount", field:"amount", width:150, editor:"number"},
            {title:"User", field:"user_id", width:150, editor:"number"},
        	 	{title:"Category", field:"category", width:150, editor:"textarea"},
        	 	{title:"Date Of Event", field:"date_of_event", editor:"textarea", sorter:"date", align:"center"},
            {title:"", field:"vacation_id", width:50, editor:"number"}
         	],
         	// rowClick:function(e, row){ //trigger an alert message when the row is clicked
         	// 	alert("Row " + row.getData().id + " Clicked!!!!");
         	// },
          //
          // cellEdited:function(cell){
          //   console.log(cell)
          // // This callback is called any time a cell is edited.
          //   return fetch(eventNames,{
          //     method: 'PUT',
          //     body: JSON.stringify(cell.getRow().getData()),
          //     headers:{
          //       'Accept': 'application/json',
          //       'Content-Type': 'application/json'
          //           }
          //       })
          //     }
        });



        //Add row on "Add Row" button click
        submitNewRowButton.addEventListener('click',function(){
          let myData = table.getData()

          for(row of myData) {
            if ( "id" in row ){

              let rowId = row.id
                delete row.id
                delete row.created_at
                delete row.updated_at

                console.log(row)
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
          table.addRow({vacation_id:1})
        })

        const data = table.getData()
        console.log(data)










        })


  }





// document.querySelector("#testbutton").click(function(){
//     console.log("hello")
// });

//Delete row on "Delete Row" button click
// $("#del-row").click(function(){
//     table.deleteRow(1);
// });
//
// //Clear table on "Empty the table" button click
// $("#clear").click(function(){
//     table.clearData()
// });
//
// //Reset table contents on "Reset the table" button click
// $("#reset").click(function(){
//     table.setData(tabledata);
// });
