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
      
      var _name = $('#gift_name'),
      _val = _name.val(),
      _url = $(this).attr('action'),
      _data = {};
      
      _data[_name.attr('name')] = _val;
      
      if (!_val) {
        
        return;
      }
      
      $.ajax({
        type: "POST",
        data: _data,
        url: _url,
        complete: function() {
          
        },
        success: function(_d) {
          
          $('#gift_list').find('li.empty').remove().end().append(_d);
          _name.val('');
        }
      })
    });
  })
}