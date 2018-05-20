$(function() {
    $('.area_sidebar , .app_chat-messages').perfectScrollbar({
        suppressScrollY: false
    });

    $('#myModal').on('shown.bs.modal', function() {
        $('#myInput').focus();
    })

    $('#nav-icon2, [data-toggle]').click(function() {
        $(this).toggleClass('open');
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });

    LongByte_InitSpoilers();

    tabs();

    AppHeight();

    showAllFiles($('.your_file'), $('.click_your-file'));

    showAllFiles($('.load_file'), $('.click_load-files'));

    showAllFiles($('.show-your_file'), $('.click_your-file'));

    ResizeSidebar();

    FixedSidebar();

    hideTabsElements();

    profileSlide();

    showBtn();

    showChatFiles();

});

function LongByte_InitSpoilers() {
    $(".finance_click").click(function() {
        $(".finance_down").stop().slideToggle();
        $(".finance_box").toggleClass("open");
        return false;
    });
}

function showAllFiles(blockHide, clickLink) {
    var notFalseFlag = true;
    var loadFilesBox = $('.load_files-box');

    clickLink.click(function(e) {
        e.preventDefault();

        if (notFalseFlag) {
            notFalseFlag = false;

            blockHide.slice(5).show();
            clickLink.text('свернуть');

        } else {
            notFalseFlag = true;

            blockHide.slice(5).hide();
            clickLink.text('показать все файлы');
        }

    });
}

function LongByte_InitSpoilers() {
    $(".finance_click").click(function() {
        $(".finance_down").stop().slideToggle();
        $(".finance_box").toggleClass("open");
        if ($(".finance_box").hasClass('open')) {
            $('.area_sidebar , .app_chat-messages').perfectScrollbar({
                suppressScrollY: false
            });
        }
        return false;
    });
}

function tabs() {
    $('ul.tabs li').css('cursor', 'pointer');
    $('ul.tabs.tabs1 li').click(function(e) {
        e.preventDefault();
        var thisClass = this.className.slice(0, 2);
        $('div.t1').hide();
        $('div.t2').hide();
        $('div.' + thisClass).show();
        $('ul.tabs.tabs1 li').removeClass('tab-current');
        $(this).addClass('tab-current');
    });
}

function showChatFiles() {
    $('.btn-tab').on('click', function(e) {
        e.preventDefault();
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.app_card').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
}

function AppHeight() {

    var appTrigger = false;
    var appBlock = $('.app_description-box');
    var appHideBtn = $('.app_to-curtail');
    var AppShadow = $('.app_shadow');

    appHideBtn.hide();
    AppShadow.hide();


    if (!appTrigger && appBlock.height() >= 50) {
        appTrigger = false;
        appBlock.addClass('height50');
        appHideBtn.text('развернуть');
        AppShadow.show();
        appHideBtn.show();
    }


    appHideBtn.click(function() {
        if (!appTrigger) {
            appBlock.removeClass('height50');

            AppShadow.hide();
            appTrigger = true;

            appHideBtn.text('свернуть');
            return false;
        }

        if (appTrigger && appBlock.height() >= 50) {
            appBlock.addClass('height50');

            AppShadow.show();
            appTrigger = false;

            appHideBtn.text('развернуть');
            return false;
        }


    });
}

function hideTabsElements() {
    var max = 5;
    var loadFile = $('.load_file');
    var yourFile = $('.your_file');
    var ShowFilesButton = $('.click_load-files');
    var ShowYourButton = $('.click_your-file');
    var i = 0;

    yourFile.each(function(i) {
        i++;
        if (i > 5) {
            $(this).hide();
            ShowFilesButton.show();
        }
    });

    loadFile.each(function(i) {
        i++;
        if (i > 5) {
            $(this).hide();
            ShowYourButton.show();
        }

    });

}

function ResizeSidebar() {
    var winHeight = $(window).height();
    var sidebarHeight = $('.area_sidebar').height();
    sidebarHeight = winHeight;
}

function FixedSidebar() {
    if ($(window).width() >= 1024) {
        var fixed = $('.fixed');
        var areaTop = $('.area_top');

        if ($(window).scrollTop() >= areaTop.height()) {
            $('.area_sidebar').addClass('fixed');
        } else if ($(window).scrollTop() < areaTop.height()) {
            $('.area_sidebar').removeClass('fixed');
        }
    }
}

function showBtn() {
    if ($(window).width() <= 1024) {
        $('.profile_mob').show();
        $('.profile').hide();

    } else {
        $('.profile').show();
        $('.profile_mob').hide();
        $('.profile_mobile').hide();

    }
}

var trig = false;

function profileSlide() {
    $('.profile_mob').on('click', function(e) {
        e.preventDefault();

        if (!trig) {
            $('.profile_mobile').stop().slideDown();
            $('.profile_mobile').addClass('open');
            $('.area_top').addClass('open_btm');

            trig = true;

            console.log('true');

            return false;

        } else if ($('.profile_mobile').hasClass('open') && trig) {
            $('.profile_mobile').stop().slideUp();
            $('.profile_mobile').removeClass('open');
            $('.area_top').removeClass('open_btm');

            trig = false;

            console.log('false');

            return false;

        }
    });

}

$(window).scroll(function() {
    FixedSidebar();
});

$(window).resize(function() {
    ResizeSidebar();
    showBtn();
});

var popup = {
    confirm: function($el, callback, breakcallback) {
        var div = $('<div />', { class: 'js-modal modal fade' }).append(
            $('<div />', {
                class: 'modal-dialog'
            }).append(
                $('<div />', {
                    class: 'modal-content'
                }).append(
                    $('<div />', {
                        class: 'modal-header'
                    }).append(
                        $('<button />', {
                            type: 'button',
                            class: 'close',
                            'data-dismiss': "modal",
                            'aria-label': "Close",
                            html: '<span aria-hidden="true">&times;</span>'
                        })
                    ).append(
                        $('<h4 />', {
                            class: 'modal-title',
                            html: ($el && $el.data('popup-title') ? $el.data('popup-title') : 'Подтверждение')
                        })
                    )
                ).append(
                    $('<div />', {
                        class: 'modal-body',
                        html: "<p>" + ($el && $el.data('popup-text') ? $el.data('popup-text') : 'Выполнить действие?') + "</p>"
                    })
                ).append(
                    $('<div />', {
                        class: 'modal-footer'
                    }).append(
                        $('<button />', {
                            type: 'button',
                            class: 'btn btn-default',
                            'data-dismiss': 'modal',
                            html: ($el && $el.data('popup-btn-close') ? $el.data('popup-btn-close') : 'Отменить'),
                        })
                    ).append(
                        $('<button />', {
                            type: 'button',
                            class: 'btn btn-' + ($el && $el.data('popup-btn-type') ? '-' + $el.data('popup-btn-type') : 'primary'),
                            html: ($el && $el.data('popup-btn-confirm') ? $el.data('popup-btn-confirm') : 'Подтвердить'),
                        }).on('click', function() {
                            if (callback)
                                return callback();
                            if ($el && $el.data('popup-ajax-remove'))
                                return $.get($el.data('popup-href') ? $el.data('popup-href') : $el.attr('href'), function() {
                                    div.modal('hide');
                                    $el.closest($el.data('popup-ajax-remove')).fadeOut(600, function() {
                                        $(this).remove();
                                    })
                                });
                            if ($el && $el.attr('href'))
                                window.location.href = $el.data('popup-href') ? $el.data('popup-href') : $el.attr('href');
                        })
                    )
                )
            )
        );

        div.modal('show');
        if (breakcallback)
            div.on('hide.bs.modal', function() {
                breakcallback();
            });
    },
    url: function(title, url, onClose) {
        codreCommon.alert('Загрзука... ' + loader, 'info');
        $.getJSON(url, function(data) {
            if (!data.content)
                return codreCommon.alert('Ошибка выполнения Ajax', 'danger', 3000);
            $('.js-alert').remove();
            popup.create(title, data.content, onClose);
        }).error(function(e, msg) {
            console.error(e);
            codreCommon.alert(msg, 'danger', 3000);
        });
    },
    create: function(title, html, onClose) {
        var div = $('<div />', { class: 'js-modal modal fade' }).append(
            $('<div />', {
                class: 'modal-dialog'
            }).append(
                $('<div />', {
                    class: 'modal-content'
                }).append(
                    $('<div />', {
                        class: 'modal-header'
                    }).append(
                        $('<button />', {
                            type: 'button',
                            class: 'close',
                            'data-dismiss': "modal",
                            'aria-label': "Close",
                            html: '<span aria-hidden="true">&times;</span>'
                        })
                    ).append(
                        $('<h4 />', {
                            class: 'modal-title',
                            html: title
                        })
                    )
                ).append(
                    $('<div />', {
                        class: 'modal-body',
                        html: html
                    })
                )
            )
        );
        div.modal('show');
        if (onClose)
            div.on('hide.bs.modal', function() {
                onClose();
            });
    },
}

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
