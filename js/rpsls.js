
var RPSLS = {

  gestures : ['rock', 'paper', 'scissor', 'lizard', 'spoc'],

  INPROGRESS : false,
  STEP : 1,
  TIMER : null,
  botGesture : '',
  userGesture : '',

  defeatedBy : {
    rock : ['scissor', 'lizard'],
    paper : ['rock', 'spoc'],
    scissor : ['paper', 'lizard'],
    lizard : ['paper', 'spoc'],
    spoc : ['scissor', 'rock']
  },

  init : function(){
    RPSLS.reset();
    $('.gestures li').click(RPSLS.userPlay);
  },

  reset : function(event){
    if(event) event.stopImmediatePropagation();
    RPSLS.INPROGRESS = false;
    RPSLS.STEP = 1;
    RPSLS.botGesture = '',
    RPSLS.userGesture = '';
    RPSLS.TIMER = null;
    $('.gestures li').css('opacity', '1');
    $('.bot').html('').hide();
    $('.result').remove();
    return false;
  },

  userPlay : function(event){
    var elm = $(this);
    if(elm.data('gesture') === 'bot' || elm.prop('tagName') != 'LI') return false;

    if(!RPSLS.INPROGRESS){
      RPSLS.INPROGRESS = true;
      
      RPSLS.userGesture = elm.data('gesture');
      $('.gestures li').css('opacity', '.1');
      $('.' + RPSLS.userGesture).css('opacity', '1');
      $('.bot').css('opacity', '1');
      RPSLS.botPlay();
    }
  },

  /* A highly efficient, intelligent, ever learning bot. NOT. */
  botPlay : function(){
    RPSLS.TIMER = setTimeout(RPSLS.showRandomBotGesture, 100);
  },

  showRandomBotGesture : function(){
    RPSLS.STEP ++;
    RPSLS.botGesture = RPSLS.gestures[Math.floor(Math.random() * 5)];
    $('.bot').html($('.' + RPSLS.botGesture).html());
    $('.bot').show();
    if(RPSLS.STEP <= 10){
      RPSLS.TIMER = setTimeout(RPSLS.showRandomBotGesture, 100);
    }else{
      clearInterval(RPSLS.TIMER);
      RPSLS.result();
    }
  },

  result : function(){
    var winner = RPSLS.winner(RPSLS.userGesture, RPSLS.botGesture);
    var msg = $('<span>').addClass('result');
    var retry = $('<button>').html('retry');
    retry.on('click', RPSLS.reset);
    msg.append(retry);
    if(winner === 'user'){
      msg.prepend("You Win!");
      $('.' + RPSLS.userGesture).append(msg);
    }else if(winner === 'bot'){
      msg.prepend("Bot Win!");
      $('.bot').append(msg);
    }else{
      msg.prepend("Draw");
      $('.bot').append(msg);
    }
  },

  winner : function(userGesture, botGesture){
    if(userGesture === botGesture){
      return 'draw';
    }else{
      if($.inArray(botGesture, RPSLS.defeatedBy[userGesture]) != -1){
        return 'user';
      }else{
        return 'bot';
      }
    }
  }
};

$(RPSLS.init);