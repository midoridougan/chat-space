$(function(){
  
  function buildHTML(messages){
    if(messages.body && messages.image){ 
      var html = `
      <div class="message" data-message-id= ${messages.id} >
        <div class="upper-message"> 
          <div class="upper-message__name"> 
            ${messages.user_name}
          </div> 
          <div class="upper-message__date"> 
            ${messages.time}
          </div> 
        </div> 
        <div class="lower-message"> 
          <div class="lower-message__message"> 
            ${messages.body}
          </div>
          <img src="${messages.image}" class="lower-message__image">
        </div>
      </div>` 
    } else if (messages.body){
      var html = `
      <div class="message" data-messages-id= ${messages.id} >
        <div class="upper-message"> 
          <div class="upper-message__name"> 
            ${messages.user_name}
          </div> 
          <div class="upper-message__date"> 
            ${messages.time}
          </div> 
        </div> 
        <div class="lower-message">
          <div class="lower-message__message">
            ${messages.body}
          </div> 
        </div>
      </div>`
    } else if (messages.image) {
      var html = `
      <div class="message" data-messages-id= ${messages.id} >
        <div class="upper-message"> 
          <div class="upper-message__name"> 
            ${messages.user_name}
          </div> 
          <div class="upper-message__date"> 
            ${messages.time}
          </div> 
        </div> 
        <div class="lower-message">
          <img src="${messages.image}" class="lower-message__image">
        </div>
      </div>`
    };
    return html;
  };
  var reloadMessages = function() {
    last_messages_id = $('.messages:last').data("messages-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_messages_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.body').append(insertHTML);
        $('.body').animate({ scrollTop: $('.body')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.body').animate({ scrollTop: $('.body')[0].scrollHeight}, 1000);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});