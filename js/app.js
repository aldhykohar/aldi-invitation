
$(document).ready(function () {
    // Smooth scrolling on nav link clicks
    $('a.nav-link').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });

            // Update active state
            $('a.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Reveal gallery items on scroll
    function reveal() {
        var reveals = document.querySelectorAll('.gallery-item, .animated-horizontal-item, .animated-vertical-item');

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                var duration = reveals[i].getAttribute('data-duration') || '2.5s';
                reveals[i].style.transition = `opacity ${duration} ease-out, transform ${duration} ease-out`;
                reveals[i].classList.add('visible');
            } else {
                reveals[i].classList.remove('visible');
            }
        }
    }

    ///ANIMATION ENTER
    const animation = () => {

        const duration = 20 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#6b08ff", "#102C57", "#29eaff"];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };


    ///ANIMATION ENTER
    const animationOpen = () => {
        const colors = ["#6b08ff", "#102C57", "#29eaff"];
        confetti({
            origin: { y: 1 },
            zIndex: 1057,
            colors: colors,
        });
    };


    //AUDIO
    var audio = document.getElementById('buttonSound');
    const musicIcon = document.getElementById('musicIcon');
    var isPlaying = false;
    document.getElementById('openButton').addEventListener('click', function () {

        audio.play();
        isPlaying = true;

        document.getElementById('welcomePage').classList.add('slide-up');
        animationOpen();
        setTimeout(function () {
            document.getElementById('welcomePage').style.display = 'none';
            document.getElementById('originalContent').style.display = 'block';
            setTimeout(function () {
                document.getElementById('originalContent').classList.add('fade-in');
                reveal(); // Trigger the reveal function after fade-in starts
                animation();
                window.addEventListener('scroll', reveal);
            }, 10);
        }, 500); // Match this timeout to the CSS transition duration
    });

    ///CLICK OPEN
    document.getElementById('playPauseButton').addEventListener('click', function () {

        if (isPlaying) {
            audio.pause();
            musicIcon.classList.remove('fa-circle-pause'); // Remove pause icon
            musicIcon.classList.add('fa-circle-play'); // Add play icon
        } else {
            audio.play();
            musicIcon.classList.remove('fa-circle-play'); // Remove play icon
            musicIcon.classList.add('fa-circle-pause'); // Add pause icon
        }
        isPlaying = !isPlaying; // Toggle state
    });




    // Set the countdown date (example: December 31, 2024)
    const countdownDate = new Date("August 04, 2024 13:00:00").getTime();
    const dayElement = document.getElementById("day");
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const countdownFunction = setInterval(function () {
        // Get current time
        const now = new Date().getTime();
        // Calculate the distance to the countdown date
        const distance = countdownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the countdown element
        dayElement.innerHTML = days;
        hourElement.innerHTML = hours;
        minuteElement.innerHTML = minutes;
        secondElement.innerHTML = seconds;

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);



    //COPIED
    document.querySelectorAll('.copyButton').forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.textContent;

            // Use the Clipboard API to copy the text
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Text copied to clipboard: ' + textToCopy);
                this.textContent = 'Tersalin!'; // Change button text

                // Revert button text back to original after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000); // 2000 milliseconds = 2 seconds
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        });
    });


    //GET NAME TO
    // Function to get the value of a URL parameter
    function getUrlParameter(name, defaultValue) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || defaultValue;
    }

    // Get the 'to' parameter value from the URL
    const toValue = getUrlParameter('to', 'Teman teman semua');

    // Display the value in the output div
    document.getElementById('to-visitor').innerText = toValue;



});

function animate(svg, timeout, classes) {
    setTimeout(function () {
        svg.classList.add(classes);
    }, timeout);
}