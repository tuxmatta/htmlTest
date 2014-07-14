(function(window, $) {
    var AW = {
        initialize: function() {

            // OPEN VIDEO CONFERENCE

            $('.play-video').on('click', function(e) {

                var videoContainer = $('.box-video');
                videoContainer.prepend('<iframe src="//player.vimeo.com/video/88883554?title=0&amp;byline=0&amp;portrait=0&amp;color=3c948b&amp;autoplay=1" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                videoContainer.fadeIn(300);
                e.preventDefault();

            });

            // CLOSE VIDEO CONFERENCE

            $('.close-video').on('click', function(e) {

                $('.box-video').fadeOut(400, function() {
                    $("iframe", this).remove().fadeOut(300);
                });

            });

            /* BT SEARCH */

            $('.bt-search').click(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    hideFilters();
                } else {
                    $(this).addClass('active');
                    $('nav.search').addClass('open');
                    $('nav .search-text input[type="text"]').focus();
                }
            });

            /* OPEN & CLOSE MAV FILTERS */

            $('nav.search .dropdown').click(function() {

                var type = $(this).data('filter');

                if ($(this).hasClass('active')) {

                    $(this).removeClass('active');
                    $('.filters').removeClass('open');

                    $('.filters').slideToggle('slow');
                    setTimeout(function() {
                        $('.filters .filter').hide();
                    }, 500);

                } else {

                    $('nav.search .dropdown').removeClass('active');
                    $(this).addClass('active');

                    if ($('.filters').hasClass('open')) {

                        $('.filters .filter').hide();
                        $('.filters .filter.' + type).fadeIn();

                    } else {

                        $('.filters').addClass('open');
                        $('.filters .filter.' + type).fadeIn();
                        $('.filters').slideToggle('slow');

                    }

                }

            });

            /* BOX SHARE (HOVER) */

            $('.box-share').hover(function() {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $('.hover-bts').removeClass('open');
                } else {
                    $(this).addClass('open');
                    $('.hover-bts').addClass('open');
                }
            });

            /* POPUP SHARES */

            $('.popup').popupWindow();

            /* SCROLL */

            $(window).scroll(function() {

                var scrollTop = $(window).scrollTop();

                if (scrollTop > 48) {
                    $('nav.search').removeClass('open');
                    $('.bt-search').removeClass('active');
                    $('body').addClass('header-fixed');
                    $('.menu2 li .box-scroll').removeClass('open');
                    $('.menu2 li span').removeClass('active');
                    hideFilters();
                } else {
                    if ($('nav.search').hasClass('visible')) {
                        $('nav.search').addClass('open');
                        $('.bt-search').addClass('active');
                    }
                    $('body').removeClass('header-fixed');
                }

                if (scrollTop > 300) {
                    $('.bt-pag.fixed').addClass('hide');
                } else {
                    $('.bt-pag.fixed').removeClass('hide');
                }

            });

            /* CLICK VOTE HEART */

            $('.s_like').live('click', function(e) {
                e.preventDefault();
                var $this = $(this);
                var $counter = $this.find('.total');
                var total = parseInt($this.find('.total').text());
                if ($this.hasClass('active')) {
                    total--;
                } else {
                    total++;
                }

                $this.addClass('processing');

                setInterval(function() {
                    $this.removeClass('processing');
                    $this.toggleClass('active');
                    $this.find('.total').text(total);
                }, 700);

                $.ajax({
                    type: 'post',
                    url: $this.data('url'),
                    success: function(data) {
                        var $parent = $this.parent();
                        $this.remove();
                        $parent.append(data);
                    }
                });
            });

            /* MENU MOBILE */

            $('body').prepend('<div id="menu-mobile"><span class="bt-menu">Menu</span><div class="wrapper-menu"></div></div>');
            $('#header nav.main ul.menu').clone().appendTo('#menu-mobile .wrapper-menu');
            $('#header nav.search .search-text').clone().appendTo('#menu-mobile .wrapper-menu');
            $('#header nav.main .others').clone().appendTo('#menu-mobile .wrapper-menu');

            $("#menu-mobile .bt-menu").click(function() {
                if ($("#menu-mobile").hasClass('open')) {
                    $("#menu-mobile").removeClass('open');
                } else {
                    $("#menu-mobile").addClass('open');
                }
            });

            $('#menu-mobile .dropdown').on('click', function() {
                $(this).find('a:first').removeAttr("href");
                $(this).find('ul').slideToggle();
            });

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $('#menu-mobile').addClass('is-mobile');
            }

            /* NEWSLETTER */

            $('#subscription_form').live('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    success: function(data) {
                        $(".subscription_form").html(data);
                    }
                });
                return false;
            });

            /* LOGIN */

            $('.open_login').click(function(e) {
                e.preventDefault();
                var $this = $(this);

                $.fancybox.showLoading();

                $.ajax({
                    type: 'get',
                    url: $this.data('url'),
                    success: function(data) {
                        $.fancybox(data, {
                            'minWidth': 650,
                            'height': 'autoSize',
                            'padding': 50
                        });
                    }
                });
            });

        },
        addFancyBox: function() {
            $('.fancybox').fancybox();
        },
        submitFilterForm: function() {
            var searchItems = $('.searchitems input:hidden');
            var whereItems = $('.box_search .actions input');

            var $form = $('#temp_form_search')
                .append(searchItems)
                .append(whereItems.clone());

            $form.submit();

            $('.box_search .filter li').unbind('click');
            $('nav.menu .searchitems').off('click', 'span', AW.removeTag);
            $('.box_search .actions').off('change', 'input:checkbox', AW.submitFilterForm);
        },
        removeTag: function() {
            $(this).remove();

            AW.submitFilterForm();
        },
        showHideTips: function() {
            // Show/Hidde tips
            $('.form-submit').on('click', 'li', function() {
                $(".form-submit .tip").hide();
                var $tip = $(this).find('.tip');
                if ($tip.length) {
                    if ($tip.hasClass('error')) {
                        $tip.filter('.error').fadeIn('fast');
                    } else {
                        $tip.addClass('current').fadeIn('fast');
                    }
                }
            });
        },
        addDiscountLetter: function() {
            $(".discount_letter").live('keydown', function() {
                var total = $(this).attr('rel') - $(this).val().length;
                if (total < 0 && e.keyCode != 46 && e.keyCode != 8) {
                    return false;
                }
                $(this).parent().find(".tip").text(total + " characters remaining.");
            });
        },
        addItemForm: function(collectionHolder) {
            // Get the data-prototype we explained earlier
            var prototype = collectionHolder.attr('data-prototype');

            // Replace '__name__' in the prototype's HTML to
            // instead be a number based on the current collection's length.
            var id = collectionHolder.children().length;
            var newForm = prototype.replace(/\__name__/g, id);
            // Display the form in the page in an li, before the "Add a item" link li
            collectionHolder.append(newForm);

            return id;
        },
        addCountdownNominee: function() {
            $('.countdown_nominee').each(function() {
                var $this = $(this);
                var time = Number($this.data('time')) * 1000;
                var date = new Date(time);
                $this.countdown({
                    until: date,
                    format: 'DHMS'
                });
            });
        },
        addFollowAndUnfollow: function() {
            $('.follow, .unfollow').live('click', function(e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.data('url') !== '') {
                    $.ajax({
                        type: "POST",
                        url: $this.data('url'),
                        success: function(data) {
                            $this.parent().html(data);
                        }
                    });
                }
            });
        }
    };

    $(document).ready(function() {
        AW.initialize();
    });

    window.AW = window.AW || {};
    window.AW = AW;
})(window, window.jQuery);

/* Menu Mobile Scroll */

$(document).ready(ScrollMenuMobile);
$(window).resize(ScrollMenuMobile);


function ScrollMenuMobile() {
    $('.wrapper-menu').css('height', $(window).height() + 'px');
}

function checkAdBlock() {

    var retVal = false;
    if ($.isAdblockOn === undefined) {
        retVal = true;

    }

    return retVal;

}



/ * Hide Nav Filters * /

function hideFilters() {
    $('nav.search .dropdown').removeClass('active');
    $('nav.search, .filters').removeClass('open');
    $('.filters, .filters .filter').hide();
}
