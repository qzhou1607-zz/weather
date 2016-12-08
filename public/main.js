$(document).ready(function() {
  $("form").on('submit',function(event) {
    event.preventDefault();
    var zip = $("input[name='zip']").val();
    var zipCode = $.trim(zip);
    var request = $.ajax({
      url:"/" + zipCode,
      dataType:"json"
    })

    request.done(function(data) {
      var temperature = data.temperature;
      $("h1").html("It is " + temperature + "&#176; in " + zipCode + "." );
    });

    request.fail(function() {
      $("h1").html("Error!");
    });
  })
});
