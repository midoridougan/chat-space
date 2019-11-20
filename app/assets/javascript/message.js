$(function(){
  function buildHTML(message){
    var html = `
    .messages
    .upper-message
      .upper-message__name
        = messages.user.name
      .upper-message__date
        = messages.created_at.strftime("%Y/%m/%d %H:%M")
    .lower-message 
      - if messages.body.present?   
        .lower-message__message
          = messages.body
      =image_tag messages.image.url, class: 'lower-message__image' if messages.image.presen    
  `
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action') 
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.textbox').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});