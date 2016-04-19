var Handlebars = require('handlebars');
var moment = require('moment');
var paginate = require('handlebars-paginate');

function link(id, url, text) {
    var id = Handlebars.escapeExpression(id);
    var url = Handlebars.escapeExpression(url);
    return new Handlebars.SafeString(
        "<a href='"+ url + id + "'>" + text + "</a>"
    );
}

function dateFormat(date) {
    return moment(date).format('MMMM Do YYYY');
}

function paginate(pagination) {
    return paginate(pagination, options);
}

function truncatePost(content, id) {
    if (content.length > 400) {
        var link = new Handlebars.SafeString("<a href='"+"/blog/"+id+"'>read more</a>.");
        return content.substring(0, 399)+"... "+link;
    } else {
        return content;
    }
}

function backLink(referrer) {
    var lastFour = referrer.substr(referrer.length - 3);
    if (lastFour == 'new') {
        return "<a class='btn btn-default' href='"+referrer+"'>Back to add a new blog post</a>"
    } else {
        return "<a class='btn btn-default' href='"+referrer+"'>Back to all blog posts</a>"
    }
}

function formatResponse(success, response) {
    if (success) {
        return "<div class='alert alert-success'>"+response+"</div>";
    } else {
        return "<div class='alert alert-danger'>"+response+"</div>";
    }
}

//function editLink(id, url, text) {
//    var id = Handlebars.escapeExpression(id);
//    var url = Handlebars.escapeExpression(url);
//    return new Handlebars.SafeString(
//        "<a href='"+ url + id + "/edit'>" + text + "</a>"
//    );
//}
//
//function clean(content) {
//    var rex = /(<([^>]+)>)/ig;
//    var cleanContent = content.replace(rex , "");
//    console.log('cleanContent ', cleanContent);
//    return cleanContent;
//}

module.exports = {
    link: link,
    dateFormat: dateFormat,
    paginate: paginate,
    truncatePost: truncatePost,
    backLink: backLink,
    formatResponse: formatResponse
};
