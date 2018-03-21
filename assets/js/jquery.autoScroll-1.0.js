(function($){
	$.fn.autoScroll = function (options) {
		var that = this;
		var settings = $.extend({
			'duration'   : '400',
			'paddingTop' : '0',
			'callback'   : null
		}, options||{});
		
		
		var dest = $(this).offset();
		if (dest) {
			dest = parseInt(dest.top) - parseInt(settings.paddingTop);

            var overflow = $('html, body').css('overflow-y');
            $('html, body').css('overflow-y', 'visible');

			$('html, body').animate( {scrollTop: dest}, settings.duration, function(){
				if($.isFunction(settings.callback)) {
					settings.callback(that);
				}
			});

            $('html').css('overflow-y', overflow);

		}
		
		return this;
	}
})(jQuery);