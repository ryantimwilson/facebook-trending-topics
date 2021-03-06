function showDescriptions() {
    $('#pagelet_trending_tags_and_topics').find('a[data-hovercard][topic-description != "true"]').each(function() {
        var descriptionDiv = $( this ).find(':first-child :first-child').next();
        $( this ).attr('topic-description', 'true');
        $.ajax({
            url: $( this ).attr('data-hovercard'),
            dataType: 'text',
            success: function(data) {
                var forPrefix = 'for (;;);';
                if (data.startsWith(forPrefix)) {
                    data = data.slice(forPrefix.length);
                }

                var parsed = JSON.parse(data);
                var htmlData = parsed['jsmods']['markup'][0][1]['__html'];
                if (htmlData !== null) {
                    var html = $('<div/>').html(htmlData);
                    html.find('a:first').find('span:first').each(function() {
                        var newText = $( this ).text();
                        if (newText.length > 0) {
                            descriptionDiv.text(newText);
                        }
                    });
                }
            }
        });
    });
}

$(document).on('DOMNodeInserted', '#pagelet_trending_tags_and_topics', function() {
    $('#pagelet_trending_tags_and_topics').bind("DOMSubtreeModified", function() {
        showDescriptions();
    });
});

showDescriptions();