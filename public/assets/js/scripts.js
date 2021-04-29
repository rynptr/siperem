



    function notif(status,get_id){

        if (status === 'success-message') {
          Swal.fire({
              title: 'Data Rencana Pembangunan Telah Diusulkan !',
              icon: 'success',
              showConfirmButton: false,
              html:
                  'Data Rencana Pembangunan',
              timer: 2000,
          })
          .then(function (result) {
              window.location.href = "https://siperem.herokuapp.com/pembangunan/";
          })
        }else{
          swal("Error occured !");
        }  
    }
  

  function GetTodayDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    

 }

 function FormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
 }
 
 
 
 function GetTime(){
   var today = new Date();
   var h = today.getHours();
   var m = today.getMinutes();
   var s = today.getSeconds();
   if(s<10){
     s = "0"+s;
   }
   var time= h+""+m+""+s;
   return time;
   //$("#jam").text(h+" : "+m+" : "+s);
   //setTimeout(function(){getdate()}, 500);
 }

 
 
 

