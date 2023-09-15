$(document).ready(function () {

    let shiftDown = false;
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let count = 0;
    let userInput = '';
    let highlightSpot = 18;
    let i = 0;
    let currentSentence = sentences[count];
    let targetKey = currentSentence[i];
    let seconds = 0;
    let numberOfMistakes = 0;

    $('#feedback').append('<p class="feedback"></p>')
    $('#target-letter').append('<p class="targetkey">' + targetKey + '</p>');
    $('#sentence').append('<p class="sentence">' + sentences[count] + '</p>');
    $('#keyboard-upper-container').toggle();

    $('body').on('keydown', function(e) {
        
        if (e.which == 16 && shiftDown == false) {
            shiftDown = true;
            $('#keyboard-upper-container').toggle();
            $('#keyboard-lower-container').toggle();
        }

    });

    $('body').on('keyup', function(e) {
        if (e.which == 16) {
            shiftDown = false;
            $('#keyboard-upper-container').toggle();
            $('#keyboard-lower-container').toggle();
        };
    });

    $('body').on('keypress', function (e) {

        let minutes = seconds / 60;
        let wpm = 54 / minutes - 2 * numberOfMistakes;

        if (seconds == 0) {
            setInterval(function () {
                seconds++
            }, 1000);
        }

        $('#'+e.keyCode).css('background-color', 'yellow');
        
        setTimeout(function () {
            $('#'+e.keyCode).css('background-color', '');
        }, 50)

        let struckKey = String.fromCharCode(e.which)
        userInput += struckKey;

        highlightSpot += 18;

        if (userInput.length == sentences[count].length) {

            $('.feedback').remove();
            $('.sentence').remove();

            highlightSpot -= 18 * userInput.length;            
            count++;

            if (count < sentences.length) {
                currentSentence = sentences[count];
            }

            i = 0;
            targetKey = currentSentence[i];

            $('#sentence').append('<p class="sentence">' + sentences[count] + '</p>');
            $('#feedback').append('<p class="feedback"></p>')

            userInput = '';
            
                if (count == sentences.length) {

                    targetKey = '';
                    minutes = seconds / 60;
        
                    function reset() {
                        location.reload();
                    };
        
                    $('.sentence').remove();
                    $('#sentence').append('Game Over! Your words per minute is ' + wpm);
        
                    setTimeout(function () {
                        $('#feedback').append('<button id="btn" class="btn btn-success">Play again?</button>')
                        $('#btn').on('click', reset);
                    }, 1000)
        
                    return
                }

        } else {

            if (struckKey == targetKey) {
                $('.feedback').append('<span class="glyphicon glyphicon-ok"></span>')
            } else {
                $('.feedback').append('<span class="glyphicon glyphicon-remove"></span>')
                numberOfMistakes++
            }

            i += 1;
            targetKey = currentSentence[i];
        };

        $('#yellow-block').css({
            'left': highlightSpot + 'px'
        });

        $('.targetkey').remove()
        $('#target-letter').append('<p class="targetkey">' + targetKey + '</p>');

    }) 

});