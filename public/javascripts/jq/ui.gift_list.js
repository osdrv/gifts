;(function($) {
  $.widget('ui.gift_list', {
    
    options: {
      'checkout': 'a.checkout',
      'edit': 'a.edit',
      'remove': 'a.remove',
      'cancel': '.cancel',
      'apply': '.apply',
      'edit_form': '#edit_wish_form',
      'li': 'li.wish',
      'url': null
    },
    
    _checkout: function(_ev, _e, _o, self) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _span = _a.nextAll('span');
      $.ajax({
        url: _o.url,
        type: 'PUT',
        data: { a: 'co', i: _wish_id },
        success: function(_r) {
          _a.fadeOut(); _a.siblings(_o.edit).fadeOut();
          _span.addClass('done');
        }
      });
    },
    
    _remove: function(_ev, _e, _o, self) {
      _ev.preventDefault();
      var _a = $(this), _wish_id = _a.closest('li').attr('i'), _li = _a.closest('li');
      $.ajax({
        url: _o.url,
        type: 'DELETE',
        data: { i: _wish_id },
        success: function(_r) {
          _li.fadeOut(function() { _li.remove(); });
        }
      })
    },
    
    _edit: function(_ev, _e, _o, self) {
      _ev.preventDefault();
      var _li = $(this).filter('li').length? $(this) : $(this).closest('li'), _wish_id = _li.attr('i');
      $.ajax({
        url: _o.url,
        type: 'GET',
        cache: false,
        data: { i: _wish_id },
        success: function(_r) {
          $(_r).insertAfter(_li.hide());
        }
      })
    },
    
    _save: function(_ev, _e, _o, self) {
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
        url: _o.url,
        type: 'POST',
        data: _data,
        success: function(_r) {
          _li.replaceWith(_r);
          _original_li.remove();
        }
      })
    },
    
    _cancel: function(_ev, _e, _o, self) {
      _ev.preventDefault();
      var _li = $(this).closest('li'), _original_li = _li.prev('li');
      _original_li.show(); _li.remove();
    },
    
    _apply: function(_ev, _e, _o, self) {
      _ev.preventDefault();
      $(this).closest('li').children('form').submit();
    },
    
    _create: function() {
      var _e = this.object, _o = this.options, self = this;
      
      if (_o.url === undefined) {
        throw "Interaction url should be specified.";
      }
      
      $(_o.checkout, _e).live('click', function(_ev) { self._checkout.call(_ev.target, _ev, _e, _o, self); });
      
      $(_o.remove, _e).live('click', function(_ev) { self._remove.call(_ev.target, _ev, _e, _o, self); });
      
      $(_o.edit, _e).live('click', function(_ev) { self._edit.call(_ev.target, _ev, _e, _o, self); });
      $(_o.li, _e).live('dblclick', function(_ev) { self._edit.call(_ev.target, _ev, _e, _o, self); });
      
      $(_o.edit_form, _e).live('submit', function(_ev) { self._save.call(_ev.target, _ev, _e, _o, self); });
      
      $(_o.cancel, _e).live('click', function(_ev) { self._cancel.call(_ev.target, _ev, _e, _o, self); });
      
      $(_o.apply, _e).live('click', function(_ev) { self._apply.call(_ev.target, _ev, _e, _o, self); });
    }
  });
})(jQuery);