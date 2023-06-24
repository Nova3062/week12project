const ENDPOINT_URL = "https://645d6729250a246ae31ed307.mockapi.io/KingsoftheRealm" //The code defines a constant ENDPOINT_URL which represents the URL of the API endpoint.
let newId //variable newId declared in the global scope, which will be used to store the ID of the selected king for updating.
  
function resetTable(){//The resetTable() function is defined. It makes a GET request to the API endpoint using $.get(). Upon receiving the response, it removes all existing table cells (<td>) and appends new rows (<tr>) based on the retrieved data. Each row contains king information and buttons for updating and deleting.
    $.get(ENDPOINT_URL).then(data => {
        $('td').remove();
        data.map(king => {
          $('tbody').prepend(
            $(`
            <tr>
              <td>${king.kingName}</td>
              <td>${king.nickName}</td>
              <td>${king.reignStart}</td>
              <td>${king.reignEnd}</td>
              <td>${king.mannerOfDeath}</td>
              <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="openmodal(${king.id})">Update</button>
              <button class="btn btn-danger" onclick="deleteKing(${king.id})">Delete</button></td>
            </tr>
            `)
          )
        })
    })
}

function addKing(){//The addKing() function is responsible for adding a new king to the API. It makes a POST request to the API endpoint with the form input values, and upon successful completion, it calls resetTable() to redraw the table and clears the form fields.
    $.post(ENDPOINT_URL, {
        kingName: $('#kingName').val(),
        nickName: $('#nickName').val(),
        reignStart: $('#reignStart').val(),
        reignEnd: $('#reignEnd').val(),
        mannerOfDeath: $('#mannerOfDeath').val(),
      
     }).then(() => {
        //redraw table and then clear form fields
        resetTable();
        document.getElementById('form').reset();
     });
}


function updateKing(newId){//The updateKing() function is used to update a king's information. It sends a PUT request to the API endpoint with the updated data in JSON format. After the request is complete, it calls resetTable() to redraw the table.
    $.ajax(`${ENDPOINT_URL}/${newId}`, {
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({
            kingName: $('#kingNamemodal').val(),
            nickName: $('#nickNamemodal').val(),
            reignStart: $('#reignStartmodal').val(),
            reignEnd: $('#reignEndmodal').val(),
            mannerOfDeath: $('#mannerOfDeathmodal').val(),
        
        }),
    }).then(resetTable); 
}
$('#smashbutton').on('click', () => {//The $('#smashbutton').on('click') event handler is triggered when the update button is clicked inside the modal. It retrieves the ID of the selected king and calls the updateKing() function with the newId parameter.
    const id = $('#staticBackdrop').data('id');
    updateKing(newId);
    
 });


function openmodal(id) {//The openmodal() function is triggered when the update button is clicked. It makes a GET request to retrieve the specific king's information based on the provided ID. The retrieved data is then used to populate the modal form fields. The modal is displayed using Bootstrap's modal() method.
    newId = id
    $.ajax(`${ENDPOINT_URL}/${id}`, {
       method: 'GET',
    }).then(king => {
       $("#kingNamemodal").val(king.kingName)  
          $("#nickNamemodal").val(king.nickName)  
          $("#reignStartmodal").val(king.reignStart)  
          $("#reignEndmodal").val(king.reignEnd)  
          $("#mannerOfDeathmodal").val(king.mannerOfDeath)  
          
 
       // Show Modal with id parameter
       $('#openmodal').modal('show').data('id', id);
    });
 }


const deleteKing = id => {//The deleteKing() function is responsible for deleting a king from the API. It sends a DELETE request to the API endpoint with the specified ID. After the deletion is completed, it calls resetTable() to redraw the table.
    $.ajax(`${ENDPOINT_URL}/${id}`, {
      method: 'DELETE',
    }) 
    .then(resetTable);
  } 


//draw table upon initial page load.
document.addEventListener('DOMContentLoaded', () => {//The document.addEventListener('DOMContentLoaded') event is used to call the resetTable() function when the page is loaded. This ensures that the table is drawn with the existing king data.

    resetTable();
 });

//  .then($("#addModal").modal("hide"));
//Overall, this code sets up the necessary functions to interact with the API endpoint, handles adding, updating, and deleting kings, and updates the table in real-time when changes occur.