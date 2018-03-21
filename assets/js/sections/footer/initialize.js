(function(){
    function setBodyPaddingBottomForShowFixedFooter() {
        $('body').css({ paddingBottom: $('#footer').outerHeight() });
    }

    $(document).ready(setBodyPaddingBottomForShowFixedFooter);
    $(window).resize(setBodyPaddingBottomForShowFixedFooter);
})();