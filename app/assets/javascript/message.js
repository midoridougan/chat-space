$(function(){
  
  var buildHTML = function(message){
    if(message.body && message.image){ 
      var html = `<div class="messages" data-message-id=` +message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__name">` +
            message.user +
          `</div>` +
          `<div class="upper-message__date">` +
            message.time +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<div class="lower-message__message">` +
            message.body
          `</div>`
          `<img src="` + message.image + `" class="lower-message__image">` +
        `</div>`
      `</div> `
    } else if (message.body){
      var html = `<div class="messages" data-message-id=` +message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__name">` +
            message.user +
          `</div>` +
          `<div class="upper-message__date">` +
            message.time +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<div class="lower-message__message">` +
            message.body +
          `</div>`
        `</div>`
      `</div> `
    } else if (message.image) {
      var html = `<div class="messages" data-message-id=` +message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__name">` +
            message.user +
          `</div>` +
          `<div class="upper-message__date">` +
            message.time +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image">` +
        `</div>`
      `</div> `
    };
    return html;
  };

  var reloadMessages = function() {
    last_message_id = $(".message:last").data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      console.log('error');
    });
  };


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
      $('.body').animate({ scrollTop: $('.body')[0].scrollHeight }, 'fast');
      $('form')[0].reset();
      
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});