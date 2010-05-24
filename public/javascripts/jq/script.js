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