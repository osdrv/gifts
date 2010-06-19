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

function mark_friend_wish(_url) {
  
  $(function() {
    $('#gift_list a.i-promise').live('click', function(_ev) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _span = _a.nextAll('span');
      $.ajax({
        url: _url,
        type: 'PUT',
        data: { a: 'fp', i: _wish_id },
        success: function(_r) {
          _a.fadeOut();
          _span.addClass('promised');
        }
      });
    })
  })
}

function my_wish_list(_url) {
  $(function() {
    var _gift_list = $('#gift_list');
    $('a.checkout', _gift_list).live('click', function(_ev) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _span = _a.nextAll('span');
      $.ajax({
        url: _url,
        type: 'PUT',
        data: { a: 'co', i: _wish_id },
        success: function(_r) {
          _a.fadeOut(); _a.siblings('a.edit').fadeOut();
          _span.addClass('done');
        }
      });
    });
    $('a.remove', _gift_list).live('click', function(_ev) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _li = _a.closest('li');
      $.ajax({
        url: _url,
        type: 'DELETE',
        data: { i: _wish_id },
        success: function(_r) {
          _li.fadeOut(function() { _li.remove(); });
        }
      })
    });
    $('a.edit', _gift_list).live('click', function(_ev) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _li = _a.closest('li');
      $.ajax({
        url: _url,
        type: 'GET',
        data: { i: _wish_id },
        success: function(_r) {
          $(_r).insertAfter(_li.hide());
        }
      })
    });
    $("#edit_wish_form").live('submit', function(_ev) {
      _ev.preventDefault();
      _ev.stopPropagation();
      var _data = {}, _li = $(this).closest('li'), _original_li = _li.prev('li');
      $(this).find('input, select, textarea').each(function(_i, _el) {
        _el = $(_el);
        var _name;
        if (_name = _el.attr('name')) {
          _data[_name] = _el.val();
        }
      });
      if ($.isEmptyObject(_data)) {
        return;
      }
      $.ajax({
        url: _url,
        type: 'PUT',
        data: { i: _id, a: 'upd', d: _data },
        success: function(_r) {
          _li.replaceWidth(_r);
          _original_li.remove();
        }
      })
    });
    $('.cancel', _gift_list).live('click', function(_ev) {
      _ev.preventDefault();
      var _li = $(this).closest('li'), _original_li = _li.prev('li');
      _original_li.show(); _li.remove();
    });
    $('.apply', _gift_list).live('click', function(_ev) {
      _ev.preventDefault();
      $(this).closest('li').children('form').submit();
    });
  })
}

$(function() {
  var _notice = $('#notice-bar');
  _notice.ajaxError(function(_ev, _xhr, _opts, _err) {
    _notice.addClass('error').html('<span class="status">' + _xhr.status + '</span>' + _xhr.responseText).fadeIn();
    window.setInterval(function() { _notice.fadeOut() }, 2500);
  })
})