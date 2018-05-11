$('#buy').on('click', function(){

    $.ajax({
        url: '/api/buy',
        data: {
            baseUrl: window.location.href,
            count:1
        },
        method: 'POST',
        success: function(result){
            // console.log(result);
            if(result.status == 1){
                window.location.href = '/login';
            }else if(result.status == 0){
                window.location.href = '/myorder';
            }
        }
    })
})