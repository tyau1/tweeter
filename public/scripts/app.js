
//document ready function start here
$(function () {
    //at the document load we will get all the tweets through getAlltweets function

    //Calling getAllTweets at the document load
    getAllTweets();

    //Function Declaration
    function getAllTweets() {
        $.ajax({
            method: "GET",
            url: "/tweets"
        }).done(function (tweets) {
            renderTweets(tweets);
        });
    } //function getAllTweets ends here

    //function renderTweets starts here
    function renderTweets(tweets) {
        $('.all-tweets').empty();
        tweets.forEach(function (element) {
            const article = createTweetElement(element);
            $('.all-tweets').prepend(article);
        })
    }
    //Function render tweets ends here

    //function to Submit / POST a new Tweet
    $('#tweetform').on('submit', function (event) {
        // prevent the default behavor
        event.preventDefault();

        //all the validations

        //error messages here
        let tweetText = $('#tweettext').val();
        if (tweetText.length <= 0) {
            $('#errormsg').css({ visibility: 'visible' }).slideDown("slow");
            $('#errormsg').text("Tweet cannot be blank!");
        } else if (tweetText.length > 140) {
            $('#errormsg').css({ visibility: 'visible' }).slideDown("slow");
            $('#errormsg').text("Tweet cannot be over 140 characters!");
        } else {
            $('#errormsg').css({ visibility: 'visible' }).slideUp("slow");
            // // ajax post request
            const serialized = $(this).serialize();
            $.ajax({
                method: "POST",
                url: "/tweets",
                data: serialized
            }).done(function () {
                // on success, refresh the tweets on the page
                getAllTweets();
            });
        }
    });
    //function POSTING tweet ends here

    //function to create a new Tweet dynamically
    function createTweetElement(
        { user: { name, avatars: { small }, handle }, content: { text }, created_at }) {


        const createdAt = moment(created_at).fromNow();

        const article = $('<article class="tweet">');
        const header = $('<header>').appendTo(article);
        $('<img class="profile-pic">').attr("src", small).appendTo(header);
        $('<h3 class="username">').text(name).appendTo(header);
        $('<p class="handle">').text(handle).appendTo(header);
        $('<div class="tweet-box">').text(text).appendTo(article);
        const like = $('<i class="fas fa-heart"></i>');
        const flag = $('<i class="fas fa-flag">');
        const retweet = $('<i class="fas fa-retweet">');
        const icons = $('<div class="icons">').append(flag).append(retweet).append(like);
        $('<footer>').text(createdAt).append(icons).appendTo(article);
        return article;

    } //function to create the Tweet dynamically ends here

    const composeButton = $('.compose-button')
    $('<i class="far fa-edit"></i>').appendTo(composeButton);
    $('.compose-button').click(function () {
        $('.new-tweet').toggle(function () {
            $('.tweet-input').focus();
        });
    })

}); //Document Ready function ends here

