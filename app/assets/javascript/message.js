$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img class = "lower-message_image" src=${message.image}>` : '';
    
    var html = `<div class="messages">
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
                    ${image}
                  </div>
                </div> `

    $ ('.messages').append(html);
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
      $('#message_body').val('');
      $('form')[0].reset();

      funtion scrollBottom(){
        var target = $('messages').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
    .always(function(data){
      $('submit-btn').prop('disabled', false);
    })
  })
})