dojo.require("dojo.hash");
dojo.require("dojo.NodeList-traverse");
dojo.require("dojo.NodeList-manipulate");
//dojo.require("dojox.form.FileUploader");
//dojo.require("dojox.embed.Flash");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.ValidationTextBox");
dojo.require('dojo.parser');


function _gifts_index_js() {

  dojo.ready(function() {

    var _container = dojo.byId('gift_list'),
    _details_div = dojo.query('#gifts_details')

    dojo.subscribe("/dojo/hashchange", this, function() {
      var _hashValue = dojo.hash();
      _href = dojo.query('a[href="#' + _hashValue + '"]', _container);
      if (_href.length) {
        _loadRightBlock(_href.attr('link')[0], _details_div);
      }
    });

    dojo.hash(dojo.hash(), true);
  });
}

function _loadRightBlock(_url, _div) {

  dojo.xhrGet({
    url: _url,
    load: function(_data) {
      _div.html(_data);
    }
  })
}

function remove_gift_pic() {
  dojo.query('#uploaded-image img').remove();
  dojo.query('#uploaded-image-control a.remove').style({ display: 'none' });
  dojo.byId('gift_image_id').value = '';
}

function new_wish_js_001(_upload_url, _sessid) {
  
  window.setTimeout(function() {
    
    var _custom = {
      upload_url: _upload_url,
      post_params: { images_session: _sessid },
      button_placeholder_id: 'add_foto',
      upload_success_handler: function(_f, _d, _resp) {
        var _img = dojo.fromJson(_d);
        dojo.byId('gift_image_id').value = _img.id;
        dojo.create('img', { src: _img.path }, dojo.byId('uploaded-image'));
        dojo.query('#uploaded-image-control a.remove').style({ display: 'block' });
      }
    };
    
    initUploader(_custom);
    dojo.parser.parse();
    var _form = dijit.byId('wish-form');
    console.log(_form);
    
    dojo.connect(_form, "onSubmit", function(_ev) {
      _ev.preventDefault();
      if (_form.isValid()) {
        console.log(dojo.toJson(_form.attr("value")));
      }
    });
    
  }, 500);
}

function initUploader(_custom) {

  var _upl_params = dojo.mixin({
    file_post_name: 'file',
    file_types: '*.jpg;*.jpeg;*.JPG;*.JPEG;*.Jpeg;*.Jpg;*.png;*.gif;*.PNG;*.GIF;*.Png;*.Gif',
    file_queue_limit: '1',
    file_upload_limit: '0',
    button_image_url: 'http://gift.me/images/attachment.png',
    button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
    button_width: " 15",
    button_height: "30",
    button_cursor: SWFUpload.CURSOR.HAND,
    button_window_mode: 'opaque',
    flash_url: "http://gift.me/javascripts/sup/swfupload_fp10/swfupload.swf",
    upload_start_handler: function(_f) {},
    file_dialog_complete_handler: function(_cnt) {
      if (_cnt) {
        this.startUpload();
      }
    },
    upload_complete_handler: function() {
      
    },
    upload_progress_handler: function(_fo, _compl, _total) {
      
    }
  }, _custom);
  
  _upl = new SWFUpload(_upl_params);

  return _upl;
}