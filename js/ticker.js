/**
 *  A comma separated list of currencies to display
 * Credit to bitcoincash.org for ticker code which uses CryptoCompare API
 */
function ticker() {
  var currencies = "USD,EUR,JPY,CNY";
  var symbols = {
	USD: "&#36;",
	CNY: "&#165;",
	JPY: "&#165;",
	EUR: "&#8364;"
  }
  
  $.ajax({
	type: "GET",
	url: "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=" + currencies,
	contentType: "application/json; charset=utf-8",
	timeout: 6000,
	error: function (x, t, m) {
	  if ($('#ticker_value').html() === '<li>Loading&hellip;</li>') {
		$('#ticker_value').html("<li><em>Problem loading prices from CryptoCompare API. Please try again later.</em></li>");
	  }
	},
	success: function (currencyRates) {
	  var output = [];
	  var parsedCurrencies = currencies.split(',');
	  for(var i = 0; i < parsedCurrencies.length; i++) {
		  var currency = parsedCurrencies[i];
		  var sym = symbols[currency];
		  if (sym === undefined) {
			sym = "";
		  }
		  
		  output.push("<li>BCH <span class=\"curr-symbol\">" + sym + "</span> " + currency + "<span class=\"curr-price\">" + currencyRates[currency] + "</span></li>");
	  }
	  
	  $('#ticker_value').html(output);
	}
  }).done(function () {
	setTimeout(function(){ ticker; }, 60000);
  }).fail(function() {
	setTimeout(function(){ ticker; }, 60000);
  });
}



if (window.addEventListener)
	window.addEventListener("load", ticker, false);
else if (window.attachEvent)
	window.attachEvent("onload", ticker);
else window.onload = ticker;