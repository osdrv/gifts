dojo.require("dojo.hash");
dojo.require("dojo.NodeList-traverse");
dojo.require("dojo.NodeList-manipulate");

function _gifts_index_js(_last_wish_url) {
  
  dojo.ready(function() {
    
    var _container = dojo.byId('gift_list'),
    _details_div = dojo.query('#gifts_details'),
    _loadWishUrl = _last_wish_url.replace(/\d+$/, '');
    
    dojo.subscribe("/dojo/hashchange", this, function() {
      var _hashValue = dojo.hash(),
      _item_id = _hashValue.match(/\d+$/);
      if (typeof(_item_id[0]) != 'undefined') {
        _item_id = _item_id[0];
        var _url = _loadWishUrl + _item_id;
        _loadWish(_url, _details_div);
      }
    });
    
    dojo.hash(dojo.hash(), true);
  });
}

function _loadWish(_url, _div) {
  
  dojo.xhrGet({
    url: _url,
    load: function(_data) {
      _div.innerHTML(_data);
    }
  })
}