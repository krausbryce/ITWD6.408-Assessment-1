//-------------------------------------------------------- 
//Slideshow 
//-------------------------------------------------------- 
let topMovies = [
	{id: 0, 
	title: "The The Shawshank Redemption", 
	year: 1994, 
	price: 9.9,
  	image_url: "https://www.filmsite.org/posters/shawshankredemption.jpg",
	description: "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
	likes: 0,
	dislikes: 0,
	comments: []
	},
	{id: 1, 
	title: "The Godfather", 
	year: 1992, 
	price: 19.9,
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAY2xsJVIZxm3K0gNtOMr9CSCvLdr5kdo3V3pv2HMuUkTBhFzRe5-b8NDRmO1mt5S5Xp_YyQ&s=10",
	description: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
	likes: 0,
	dislikes: 0,
	comments: []	
	},
	{id: 2, 
	title: "The Dark Knight", 
	year: 2008, 
	price: 29.9,
    image_url: "https://upload.wikimedia.org/wikipedia/sco/8/8a/Dark_Knight.jpg",
	description: "Batman has a new foe, the Joker, who is an accomplished criminal hell-bent on decimating Gotham City. Together with Gordon and Harvey Dent, Batman struggles to thwart the Joker before it is too late.",
	likes: 0,
	dislikes: 0,
	comments: []	
	},
	{id: 3, 
	title: "Django Unchained", 
	year: 2012, 
	price: 39.9,
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KoMaeepnWXAZFM23e9zdG7z7eGJJ93BK0_e2Den0og406g1OsRGgKH8Cq6TKV7lFtEyL&s=10",
	description: "Django, an African slave, is freed by a German bounty hunter and becomes his apprentice. Together, they attempt to rescue his wife, who has been enslaved by a charming but cruel plantation owner.",
	likes: 0,
	dislikes: 0,
	comments: []	
	},
	{id: 4, 
	title: " Schindler\'s List", 
	year: 1993, 
	price: 49.9,
    image_url: "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
	description: "Oscar Schindler, a successful and narcissistic German businessman, slowly starts worrying about the safety of his Jewish workforce after witnessing their persecution in Poland during World War II.",
	likes: 0,
	dislikes: 0,
	comments: []
	},
];
//Slideshow: Manual
let slideIndex = 0;//Initial slide = 0

const nextSlide = () => {
	//Change the slide_index
  slideIndex < topMovies.length - 1 ? slideIndex++ : (slideIndex = 0);
	//Change the title, year and image source accordingly
	document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
    document.getElementById("manual-slide-year").innerHTML = topMovies[slideIndex].year;
	document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;
	document.getElementById("manual-slide-description").innerHTML = topMovies[slideIndex].description;	
}

const previousSlide = () => {
	//Change the slide_index
  slideIndex > 0 ? slideIndex-- : (slideIndex = topMovies.length - 1);
	//Change the title, year and image source accordingly
	document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
    document.getElementById("manual-slide-year").innerHTML = topMovies[slideIndex].year;
	document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;
	document.getElementById("manual-slide-description").innerHTML = topMovies[slideIndex].description;		
}


//------------------------------------------------
//Slideshow: Automatic
let autoSlideIndex = 0;

let autoSlideShow = () => {
//Change the slide_index
	if (autoSlideIndex < topMovies.length - 1) {
		autoSlideIndex++;
	} else {
		autoSlideIndex = 0;
	}
	//Change the title, year and image source accordingly
	document.getElementById("auto-slide-title").innerHTML = topMovies[autoSlideIndex].title;
    document.getElementById("auto-slide-year").innerHTML = topMovies[autoSlideIndex].year;
	document.getElementById("auto-slide-image").src = topMovies[autoSlideIndex].image_url;
	document.getElementById("auto-slide-description").innerHTML = topMovies[autoSlideIndex].description;
	//Wait 2 seconds
	setTimeout(autoSlideShow, 2000);//Auto change slide every 2 seconds
}
autoSlideShow();

//-------------------------------------------------------- 
//Modal
//-------------------------------------------------------- 
const myModal = document.getElementById('myModal');

if (myModal) {
    const myInput = document.getElementById('myInput');
    myModal.addEventListener('shown.bs.modal', () => {
        if (myInput) {
            myInput.focus();
        }
    });

}

//------------------------------------------------
// Online Shop 1
//------------------------------------------------

let shopIndex = 0;
let favourites = [];

function displayMovie() {
    let movie = topMovies[shopIndex];
    document.getElementById("shopMovieTitle").innerHTML =
        movie.title;
    document.getElementById("shopMovieYear").innerHTML =
        movie.year;
    document.getElementById("shopMovieDescription").innerHTML =
        movie.description;
    document.getElementById("shopMoviePrice").innerHTML =
        "$" + movie.price.toFixed(2);
    document.getElementById("shopMovieImage").src =
        movie.image_url;
    document.getElementById("likeCount").innerHTML =
        movie.likes;
    document.getElementById("dislikeCount").innerHTML =
        movie.dislikes;
    renderComments();
}
displayMovie();

/*Next Product*/
function nextShopMovie() {
    if (shopIndex < topMovies.length - 1) {
        shopIndex++;
    } else {
        shopIndex = 0;
    }
    displayMovie();
}

/*Previous Product*/
function previousShopMovie() {
    if (shopIndex > 0) {
        shopIndex--;
    } else {
        shopIndex = topMovies.length - 1;
    }
    displayMovie();
}

/*Likes*/
function likeMovie() {
    topMovies[shopIndex].likes++;
    displayMovie();
	initialiseDashboard();
}


/*Dislikes*/
function dislikeMovie() {
    topMovies[shopIndex].dislikes++;
    displayMovie();
}

/*Comments*/
function addComment() {
    let commentText =
        document.getElementById("commentInput").value;
    if (commentText.trim() === "") {
        return;
    }

    topMovies[shopIndex].comments.push(commentText);
    document.getElementById("commentInput").value = "";
    renderComments();
	initialiseDashboard();
}

/*Render Comments*/
function renderComments() {
    let list =
        document.getElementById("commentList");
    list.innerHTML = "";

    let comments =
        topMovies[shopIndex].comments;
    comments.forEach(comment => {
        list.innerHTML += `
            <li class="list-group-item">
                ${comment}
            </li>
        `;
    });
}

/*Favourites*/
function addFavourite() {
    let movie = topMovies[shopIndex];
    let exists =
        favourites.find(
            fav => fav.id === movie.id
        );
    if (!exists) {
        favourites.push(movie);
        renderFavourites();
		initialiseDashboard();
    }
}

/*Render Favourite List*/
function renderFavourites() {
    let list =
        document.getElementById("favouriteList");
    list.innerHTML = "";
    favourites.forEach(movie => {
        list.innerHTML += `
            <li class="list-group-item">
                ${movie.title}
                (${movie.year})
            </li>
        `;
    });
}

//------------------------------------------------
// DEMO 3 - SHOP DASHBOARD
//------------------------------------------------
let dashboardCalendar = null;

document.addEventListener('DOMContentLoaded', function () {
    initialiseDashboard();
});

function initialiseDashboard() {
    document.getElementById("totalMovies").innerHTML =
        topMovies.length;
    let totalLikes =
        topMovies.reduce(
            (sum, movie) => sum + movie.likes,
            0
        );
    document.getElementById("totalLikes").innerHTML =
        totalLikes;
    let totalComments =
        topMovies.reduce(
            (sum, movie) => sum + movie.comments.length,
            0
        );
    document.getElementById("totalComments").innerHTML =
        totalComments;
    document.getElementById("totalFavourites").innerHTML =
        favourites.length;
    createCalendar();

}
/*Calendar*/
function createCalendar() {
    if (dashboardCalendar) {
        return;
    }
    const calendarEl =
        document.getElementById('calendar');
    if (!calendarEl) return;
    dashboardCalendar =
        new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            height: 600,
            events: [
                {
                    title: 'New Movie Release',
                    start: '2026-09-05'
                },
                {
                    title: 'Stock Arrival',
                    start: '2026-09-10'
                },
                {
                    title: '50% Sale Event',
                    start: '2026-09-15'
                },
                {
                    title: 'Inventory Audit',
                    start: '2026-09-20'
                },
                {
                    title: 'Black Friday Planning',
                    start: '2026-09-25'
                }
            ],
            eventClick: function(info) {
                alert(
                    "Event: " +
                    info.event.title
                );
            }
        });
    dashboardCalendar.render();
    populateEventList();
}
function populateEventList() {
    const events = [
        "New Movie Release",
        "Stock Arrival",
        "50% Sale Event",
        "Inventory Audit",
        "Black Friday Planning"
    ];
    let eventList =
        document.getElementById("eventList");
    eventList.innerHTML = "";
    events.forEach(event => {
        eventList.innerHTML += `
            <li class="list-group-item">
                ${event}
            </li>
        `;
    });
}

//------------------------------------------------
// DEMO 4 - QUIZ
//------------------------------------------------

const quizQuestions = [

    {
        question: "Which movie features Andy Dufresne?",
        answers: [
            "The Godfather",
            "The Shawshank Redemption",
            "Django Unchained",
            "The Dark Knight"
        ],
        correct: 1
    },

    {
        question: "Who is Batman's enemy in The Dark Knight?",
        answers: [
            "Bane",
            "Penguin",
            "Joker",
            "Riddler"
        ],
        correct: 2
    },

    {
        question: "Which movie stars Don Vito Corleone?",
        answers: [
            "The Godfather",
            "Django Unchained",
            "Schindler's List",
            "Titanic"
        ],
        correct: 0
    },

    {
        question: "Which film is set during World War II?",
        answers: [
            "Avatar",
            "Schindler's List",
            "The Dark Knight",
            "Inception"
        ],
        correct: 1
    },

    {
        question: "Who is rescued in Django Unchained?",
        answers: [
            "Rachel",
            "Sarah",
            "Broomhilda",
            "Emma"
        ],
        correct: 2
    }

];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {

    const question =
        quizQuestions[currentQuestion];

    document.getElementById("questionText").innerHTML =
        question.question;

    document.getElementById("questionNumber").innerHTML =
        currentQuestion + 1;

    document.getElementById("questionTotal").innerHTML =
        quizQuestions.length;

    const container =
        document.getElementById("answerButtons");

    container.innerHTML = "";

    question.answers.forEach(
        (answer, index) => {

            container.innerHTML += `
                <button
                    class="btn btn-outline-primary d-block mb-2 w-100"
                    onclick="checkAnswer(${index})">
                    ${answer}
                </button>
            `;

        }
    );

}

function checkAnswer(selected) {

    const question =
        quizQuestions[currentQuestion];
    if (selected === question.correct) {
        score++;
        document.getElementById("quizScore").innerHTML =
            score;
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {

    document.getElementById("questionText").innerHTML =
        `Quiz Finished! Score: ${score}/${quizQuestions.length}`;

    document.getElementById("answerButtons").innerHTML = `
        <button
            class="btn btn-success"
            onclick="restartQuiz()">
            Restart Quiz
        </button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quizScore").innerHTML = 0;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("questionText")) {
        loadQuestion();
    }
});