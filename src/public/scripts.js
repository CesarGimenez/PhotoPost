$('#newcomment').hide();

$('#btn-like').click(function(e){
    e.preventDefault();
    let img = $(this).data('id');
    
    $.post('/images/' + img + '/like')
    .done(data=>{
        $('.likes-count').text(data)
    })
})

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Estas seguro de querer eliminar esta imagen?')
    if(response){
        let img = $this.data('id');
        $.ajax({url: '/images/' + img, type: 'DELETE'}).done(function(results){
            console.log(results)
        })
    }
})
$('#btn-toggle-comment').click(function(e){
    e.preventDefault();
    $('#newcomment').slideToggle();
})