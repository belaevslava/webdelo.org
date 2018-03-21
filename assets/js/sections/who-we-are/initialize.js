$(function () {

    var departments = [
        {
            'title'  : 'Developers',
            'header' : 'Developers Team',
            'icon'   : 'assets/images/sections/who-we-are/developers_mini.jpg',
            'image'  : 'assets/images/sections/who-we-are/developers.jpg'
        },
        {
            'title'  : 'SEO',
            'header' : 'SEO Team',
            'icon'   : 'assets/images/sections/who-we-are/seo_mini.jpg',
            'image'  : 'assets/images/sections/who-we-are/seo.jpg'
        },
        {
            'title'  : 'Copywriting',
            'header' : 'Copywriting Team',
            'icon'   : 'assets/images/sections/who-we-are/copywriting_mini.jpg',
            'image'  : 'assets/images/sections/who-we-are/copywriting.jpg'
        },
        {
            'title'  : 'Managers',
            'header' : 'Managers Team',
            'icon'   : 'assets/images/sections/who-we-are/managers_mini.jpg',
            'image'  : 'assets/images/sections/who-we-are/managers.jpg'
        }
    ];

    $.each(departments, function (index, value, arr) {
        var img$     = $('<img>'),
            caption$ = $('<figcaption>'),
            figure$  = $('<figure>'),
            li$      = $('<li>'),
            closer$  = $('<div>').addClass('team-close'),
            bigImg$  = $('<div>'),
            header$  = $('<div>').addClass('team-header').append($('<h1>').text(value.header));

        img$.attr({
            'src' : value.icon,
            'alt' : value.title
        }).click(function () {
            var li$ = $(this).parents('li');
            if ( !li$.hasClass('disabled') ) {
                var bigImg$ = li$.find('.team-bg').clone();
                bigImg$.appendTo( $('#who-we-are') ).fadeIn(100, function () {
                    $(this).removeClass('d-none');
                });

                li$.addClass('active')
                    .siblings()
                    .removeClass('active')
                    .addClass('disabled');
            }
        });
        closer$.click(function () {
            $(this).parents('li').removeClass('active')
                .siblings()
                .removeClass('disabled');

            $('.team-bg:visible').fadeOut(10, function () {
                $(this).remove();
            });
        });
        caption$.text( value.title );
        bigImg$.addClass('team-bg d-none')
            .append(header$)
            .css({'background-image': 'url('+value.image+')'});

        figure$.append(img$).append(caption$).append(bigImg$);

        li$.append(figure$)
            .append(closer$)
            .data('big-image', value.image)
            .data('header', value.header)
            .addClass('d-none d-sm-block')
            .appendTo($('#list-of-worker-groups'));
    });

});