(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  let password = $("#password");
  function validate(input) {
    if (
      $(input).attr("type") == "username" ||
      $(input).attr("name") == "username"
    ) {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
    if ($(input).attr("name") == "password" && password.val().length < 6) {
      return false;
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

$(function () {
  $("#myToSelect").toSelect();
});

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


try {
  fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' })).then(function(response) {
    return true;
  }).catch(function(e) {
    var carbonScript = document.createElement("script");
    carbonScript.src = "//cdn.carbonads.com/carbon.js?serve=CK7DKKQU&placement=wwwjqueryscriptnet";
    carbonScript.id = "_carbonads_js";
    document.getElementById("carbon-block").appendChild(carbonScript);
  });
} catch (error) {
  console.log(error);
}
console.log("1")
// function updateDependent(){
//   var c = $currencySelect.val(),
//       vals = master[c].values;
//       console.log(c)

//   $amountSelect.empty();
//   $.each(vals, function(){
// console.log(vals)

//     $('<option/>', { value : this }).appendTo($amountSelect);
//   });
// }

// //var subDomain = window.location.host.split('.')[0] || "ru",

// var subDomain = "1",
//   master = {
//     "1": {
//       "values": ["Parada 32", "La Barra", "El Emir"]
//     },
//     "2": {
//       "values": ["El Barco","El Desplayado"]
//     },
//     "3": {
//       "values": ["Playa Honda", "Playa Pocitos", "Playa Carrasco"]
//     }
//   },
//   $currencySelect = $("#select1"),
//   $amountSelect = $("#select2");

// $currencySelect.on("change", updateDependent);
// getElementById("#select1").val(subDomain).trigger("change"); 