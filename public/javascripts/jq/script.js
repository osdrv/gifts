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

function updateWishes(_body, _li_instead) {
  
  _body = $(_body);
  _li = _body.children('li');
  if (_li.length) {
    if (_li_instead !== undefined) {
      _li_instead.replaceWith(_li);
    } else {
      $('#gift_list').append(_li);
    }
    $('#gift_image, #gift_name').val('');
  }
}

function add_wish(_upload_url) {

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
    
    var _upl = initUploader('add_foto', _upload_url);
  })
}

function initUploader(_id, _upload_url) {
  
  var _upl_params = {
    upload_url: _upload_url,
    file_post_name: 'file',
    file_types: '*.jpg;*.jpeg;*.JPG;*.JPEG;*.Jpeg;*.Jpg;*.png;*.gif;*.PNG;*.GIF;*.Png;*.Gif',
    file_queue_limit: '1',
		file_upload_limit: '0',
    button_placeholder_id: _id,
    button_image_url: 'http://gift.me/images/chs_pic.png',
    button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
    button_width: "50",
    button_height: "30",
    button_cursor: SWFUpload.CURSOR.HAND,
    button_window_mode: 'opaque',
    upload_start_handler: function(_f) {},
    file_dialog_complete_handler: function(_cnt) {
      if (_cnt) {
        this.startUpload();
      }
    },
    upload_success_handler: function(_f, _d, _resp) {
      var _form = $('#add_wish_form').children('img').remove().end(),
      _img = $('<img src="' + _d + '" />').prependTo(_form);
    },
    upload_complete_handler: function() {},
    flash_url: "http://gift.me/javascripts/sup/swfupload_fp10/swfupload.swf"
    //debug: true
  }
  
  _upl = new SWFUpload(_upl_params);
  
  return _upl;
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
    $('#gift_list').gift_list({ url: _url });
  })
}

function login_form(_login_label, _password_label) {
  $(function() {
    $('#login').smart_input({ label: _login_label, emptyCss: { color: '#C0C0C0' }, filledCss: { color: '#000' } });
    $('#password').smart_input({ label: _password_label, emptyCss: { color: '#C0C0C0' }, filledCss: { color: '#000' } });
  })
}

$(function() {
  var _notice = $('#notice-bar');
  _notice.click(function(_ev) { _ev.preventDefault(); $(this).slideUp(); });
  _notice.ajaxError(function(_ev, _xhr, _opts, _err) {
    var _text = _xhr.responseText.replace(/(<style>[^<]+<\/style>)/, '');
    _notice.addClass('error').html('<span class="status">' + _xhr.status + '</span>' + _text).fadeIn();
  })
})