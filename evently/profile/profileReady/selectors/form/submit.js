function submitPost(event) {
  var form = this;
  var date = new Date();
  var id = date.valueOf()+"a";
  var db = $$(this).app.db;
  var doc = {
    created_at : date,
        _id : id,
    profile : $$("#aspect_header").profile,
    message : $("[name=message]", form).val(),
    _attachments : {},
    hostname : window.location.href.split("/")[2]
  };
  $.post("http://couchappspora.superfeedr.com",{ 
    "hub.mode":"publish", "hub.url":"http://"+doc.hostname+"/feeds/"+doc.profile.name
  });
  
  window.files = window.files || [];
  $.each(window.files, function(i, file) {
    doc._attachments["image" + i + "." + file.match] = {
      "content_type": "image\/" + file.match,
      "data": file.theGoodPart
    };
  });
  
  posts(db).save(doc).addCallback(function(newDoc) {
    // Clear post entry form
    $("[name=message]", form).val("");

    // Remove image attachments from entry form
    $('a.deleteattachment').trigger('click');

    // Reload posts
    $('.items').trigger('show');
  });

  event.preventDefault();
}
