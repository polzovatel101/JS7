/**
 * Created by Илья Яновой on 18.03.2016.
 */

'use strict';


var Tests = {
    init: function () {
        localStorage.clear();
        localStorage.setItem('questions', this.questions);
        localStorage.setItem('answers', this.answer);
        var ans = [];
        for (var i = 0; i < 3; i++) {
            ans = localStorage.getItem('answers').split(',');
        }
        this.createTreeText(localStorage.getItem('questions').split(','), ans);
    },

    questions: ['Вопрос №1', 'Вопрос №2', 'Вопрос №3'],

    answer: [
        ['Вариант ответа №11', 'Вариант ответа №21', 'Вариант ответа №31'],
        ['Вариант ответа №12', 'Вариант ответа №22', 'Вариант ответа №32'],
        ['Вариант ответа №13', 'Вариант ответа №23', 'Вариант ответа №33']
    ],

    createForm: function () {
        var container = document.getElementsByClassName('container');
        container[0].innerHTML = '<form>' + '</form>';
    },

    createTreeText: function (question, answer) {

        this.createForm();

        var form = document.querySelector('form');

        form.innerHTML += '<h2>' + 'Тест по программированию' + '</h2>' + '\n';

        for (var i = 0; i < question.length; i++) {
            form.innerHTML += '<ul>' + question[i] + '</ul>';
            var ul = document.querySelectorAll('ul');
            for (var j = 0; j < 3; j++) {
                ul[i].innerHTML += '<li>' + '<label>' + '<input type="radio" name="answer' + i + '" value="' + answer[j] + '">' + answer[j] + '</label>' + '</li>';
            }
            answer.splice(0, 3);
        }
        form.innerHTML += '<button type="button">' + 'Проверить мои результаты' + '</button>' + '\n';
        var input = document.querySelectorAll('input');

        var button = document.querySelector('button');
        button.className = 'btn btn-info';
        var li = document.querySelectorAll('li');
        for (i = 0; i < li.length; i++) {
            li[i].className = 'list';
        }
    },

    checkedAnswer: function (answer) {
        var $result = $('form').serializeArray();
        var $resultOfTest = $('.result_of_test');

        for (var i = 0; i < $result.length; i++) {
            if ($result[i].value == answer[i]) {
                // console.log('эта хуйня работает');
                $resultOfTest.append('<p>Ответ ' + $result[i].value + ' правильный!</p>');
            } else {
                $resultOfTest.append('<p>Ответ ' + $result[i].value + ' неправильный(</p>');
            }
        }
    }
};

Tests.init();

(function () {
    var a = ['Вариант ответа №11', 'Вариант ответа №22', 'Вариант ответа №33'];

    var $btn = document.getElementsByClassName('btn-info')[0];
    var $modalW = $('.modal_window');
    var $modal = $('.modal');

    $btn.addEventListener('click', function () {
        Tests.checkedAnswer(a);
        $modalW.fadeIn(100);
        $modal.fadeIn(100);
    });

    $('.close_modal_window').on('click', function () {
        $modalW.fadeOut(100).children('.result_of_test').html('');
        $modal.fadeOut(100);
        $('input').removeAttr('checked');
    })
})();
