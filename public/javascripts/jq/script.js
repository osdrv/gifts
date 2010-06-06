function search_user(_p1) {
  
  $(function() {
    
    $('#user_search_form').submit(function(_ev) {
      
      _ev.preventDefault();
      
      var _val = $('#q').val();
      
      if (!_val) {
        
        return;
      }
      
      $.ajax({
        type: "GET",
        data: { 'q': _val },
        url: _p1,
        complete: function() {
          
        },
        success: function(_d) {
          
          $('#search_result').html(_d);
        }
      })
    });
  })
}

function add_wish() {
  
  $(function() {
    
    $('#add_wish_form').submit(function(_ev) {
      
      _ev.preventDefault();
      
      var _data = {},
      _url = $(this).attr('action');
      
      if (!$('#gift_name').val()) {
        
        return;
      }
      
      $(this).find('input, select, textarea').each(function(_i, _el) {
        
        var _el = $(_el), _name = _el.attr('name');

        if (_name) {
          _data[_name] = _el.val();
        }
      });
      
      $.ajax({
        type: "POST",
        data: _data,
        url: _url,
        complete: function() {
          
        },
        success: function(_d) {
          
          $('#gift_list').find('li.empty').remove().end().append(_d);
          $('#gift_name').val('');
        }
      })
    });
  })
}

function request_friendship(_url, _user_id) {
  
  $(function() {
    $('#request-frienship').click(function() {
      var self = this;
      $(self).html('loading...');
      $.ajax({
        type: 'POST',
        url: _url,
        data: { user_id: _user_id },
        success: function(_r) {
          $(self).html('request sent!')
        },
        complete: function() {
          
        }
      })
    })
  })
}

function friendship_requests(_url) {
  
  $('#friendship-requests-list').find('a.allow').click(function(_ev) {
    _ev.preventDefault();
    var _a = $(this), _li = _a.closest('li'), _user_id = _li.attr('userid');
    
    $.ajax({
      type: 'PUT',
      url: _url,
      data: { user_id: _user_id },
      success: function(_r) {
        if (!_li.siblings('li.user:visible').length) {
          _li.parent().fadeOut()
        } else {
          _li.fadeOut();
        }
      }
    })
  }).end().find('a.decline').click(function(_ev) {
    _ev.preventDefault();
    var _a = $(this), _li = _a.closest('li'), _user_id = _li.attr('userid');
    
    $.ajax({
      type: 'DELETE',
      url: _url,
      data: { user_id: _user_id },
      success: function(_r) {
        _li.fadeOut(function() {
          if (!_li.siblings('li.user:visible').length) {
            _li.parent().fadeout()
          }
        });
      }
    })
  })
}