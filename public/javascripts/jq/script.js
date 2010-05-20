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

function add_wish(_p1) {
  
  $(function() {
    
    $('#add_wish_form').submit(function(_ev) {
      
      _ev.preventDefault();
      
      var _val = $('#i').val();
      
      if (!_val) {
        
        return;
      }
      
      $.ajax({
        type: "GET",
        data: { 'i': _val },
        url: _p1,
        complete: function() {
          
        },
        success: function(_d) {
          
          $('#gift_list').find('li.empty').append.html(_d);
        }
      })
    });
  })
}