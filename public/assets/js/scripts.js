



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
              window.location.href = "../pembangunan/";
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

 function cek_data(nip){
    
    $.ajax({
        type: "GET",
        url: "https://sikadir.k-7.monster/cekabsen/"+nip,
        dataType: "json",
        success: function (data) {
            var cek_data = data[0].cek_data;
            get_nama(nip,cek_data); 
	           
        }
    }); 
 }

 
 function get_nama(nip,cek_data){
//alert('get_nama');
	
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://simpeg.k-7.monster/asn?nip="+nip,
        dataType: "json",
        success: function (data) {
            var nama = data[0].nama; 
            if(cek_data =='0'){
                //alert('post');
                post_data_absen(nip,nama)    
            }else{
                //alert('update');
                update_data_absen(nip,nama)        
            }
            
        }
    }); 
 }
 
 

 function update_data_absen(nip,nama){
    var lat = $("#latitude").val();
    var long = $("#longitude").val(); 

    var now = new Date(Date.now());
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    var tanggal = GetTodayDate();

    var formData = {
        nip:nip,
        waktu_pulang:time,
        tanggal:tanggal
    }; 
    
    $.ajax({
        url : "https://sikadir.k-7.monster/absen",
        type: "PUT",
        dataType: "json",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            notif('success-message',nip,nama,tanggal,time)
            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR);
            alert('fail' + textStatus.code);
        }
    });
 }


