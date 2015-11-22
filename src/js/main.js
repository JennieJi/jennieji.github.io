'use strict';

(function($) {
	$(function() {
		$('body').css({
			backgroundImage: 'url("img/' + Math.floor(Math.random() * 4) + '.jpg")'
		});
	});
}(jQuery));
