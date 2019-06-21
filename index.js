let userId = ""
let vacationId = ""
const vacationURL = "http://localhost:3000/vacations"
const userNames = "http://localhost:3000/users"
const eventNames = "http://localhost:3000/events"

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
// fetchVacationNames()
// fetchVacation1()
// fetchUserNames()
// fetchUser1()
// fetchEvents()
welcome()
fetchUserNames()


// returningUserButton.addEventListener("click", function(e){
//   fetchUserNames()
// })

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
            // userId = ce.id

            li = document.createElement('li')
            li.textContent = ce.name
            console.log("first block",  ce.id)
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
          console.log(response)
          response.vacations.map(function(ec){
          vacationId = ec.id
          console.log("vacation id",vacationId)
          liea = document.createElement('li')
          liea.textContent = ec.name
          liea.addEventListener("click", function(e){
            fetchVacation(ec.id)
            console.log("fetch vacation",ec.id)
          })
          ul.appendChild(liea)
          })
          })
        }

function fetchVacation(vacationId){
  vacationPage.style.display = "block";
  userPage.style.display = "none";
  welcomePage.style.display = "none";


    userPage.style.display = "none";
    vacationPage.style.display = "block";
  hvacation.innerText = "This is the vacation data page!"
  addRowButton.innerText = "Add Row"
    const vacationShow = `http://localhost:3000/vacations/${vacationId}`
      return fetch(vacationShow)
      .then(response => response.json())
      .then(response => {
        console.log(response.events)
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

        homeButton.addEventListener('click',function(){

          welcome()
            })



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
