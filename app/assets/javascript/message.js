$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "image_size", src="$(message.image)">` : ''
    
    var html = `
      <div class="messages">
        <div class="upper-message">
          <div class="upper-message__name">
            ${message.user}
          </div>

          <div class="upper-message__date">
            ${message.time}
          </div>
        </div>
        <div class="lower-message">
          <div class="lower-message__message">
            ${message.body}
          </div>
        </div>
      </div>`
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
      var html = buildHTML(data);
      $('.body').append(html);
      $('#message_body').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});