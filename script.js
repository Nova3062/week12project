const ENDPOINT_URL = "https://645d6729250a246ae31ed307.mockapi.io/KingsoftheRealm"
let newId 
  
function resetTable(){
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

function addKing(){
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


function updateKing(newId){
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
$('#smashbutton').on('click', () => {
    const id = $('#staticBackdrop').data('id');
    updateKing(newId);
    
 });


function openmodal(id) {
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


const deleteKing = id => {
    $.ajax(`${ENDPOINT_URL}/${id}`, {
      method: 'DELETE',
    }) 
    .then(resetTable);
  } 


//draw table upon initial page load.
document.addEventListener('DOMContentLoaded', () => {
    resetTable();
 });

//  .then($("#addModal").modal("hide"));
