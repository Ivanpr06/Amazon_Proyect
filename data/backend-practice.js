const xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();