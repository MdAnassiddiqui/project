$(function() {
    var originalPositions = {};

    function storeOriginalPositions() {
        $(".component").each(function() {
            var id = $(this).attr('id');
            originalPositions[id] = $(this).position();
        });
    }

    $(".component").each(function() {
        // Append resize handles dynamically
        $(this).append('<div class="resize-handle top"></div>' +
                       '<div class="resize-handle right"></div>' +
                       '<div class="resize-handle bottom"></div>' +
                       '<div class="resize-handle left"></div>' +
                       '<div class="resize-handle top-left"></div>' +
                       '<div class="resize-handle top-right"></div>' +
                       '<div class="resize-handle bottom-left"></div>' +
                       '<div class="resize-handle bottom-right"></div>');

        // Make components resizable
        $(this).resizable({
            minWidth: 100,
            minHeight: 100,
            handles: {
                '': '.resize-handle',
                'n': '.resize-handle.top',
                'e': '.resize-handle.right',
                's': '.resize-handle.bottom',
                'w': '.resize-handle.left',
                'ne': '.resize-handle.top-right',
                'nw': '.resize-handle.top-left',
                'se': '.resize-handle.bottom-right',
                'sw': '.resize-handle.bottom-left'
            },
            resize: function(event, ui) {
                var parent = $(this).parent();
                var sibling = $(this).siblings('.component');
                var index = $(this).index();
                var newPosition = ui.position;

                // Adjust sibling position based on index
                if (index === 2) {
                    sibling.css({
                        top: newPosition.top + ui.helper.height(),
                        left: newPosition.left
                    });
                } else {
                    sibling.css({
                        top: newPosition.top,
                        left: newPosition.left + ui.helper.width()
                    });
                }
            }
        });
    });

    // Store original positions on window load
    $(window).on('load', function() {
        storeOriginalPositions();
    });
});
