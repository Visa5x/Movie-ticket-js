
const seats = {
  1: {
    available: [1, 2, 3, 4, 5 ,7,8,11, 12, 13, 14, 15,16,20,21,23,24,26,27,29,30],
    booked: [6, 17, 18, 9, 10,19,22,25,28]
  },
  2: {
    available: [1,2,3,4,5,9,11, 12, 13, 14, 15,16,17,18,21,23,24,25,26,28,30],
    booked: [6, 7, 8, 19, 10,22,27,29]
  },
  3: {
    available: [2,3,4,5,7,8,10,11,12,14,16,18,21, 20,21, 23, 24, 15,26,27,28,29],
    booked: [1,6, 17, 28, 9, 13,22,3,25,19,30]
  },
  4: {
    available: [21, 22, 23, 24, 25,1,2,3,14,16,17,18,27,28,30,5,6,7,8],
    booked: [20,4,29,26, 15, 19, 9, 10]
  },
  5: {
    available: [1,3,4,5,6,7,9,11,12,13,14,15,21, 22, 23, 24, 25,28,29],
    booked: [16, 17, 8, 2, 26,27,30,23,10]
  },
  6: {
    available: [1,2,3,4,5,7,8,9,10,11,12,13,14,15,16,18,21, 22, 23, 24, 25],
    booked: [20, 17, 28, 9, 6,26,27,30]
  }
};

const movieSelect = document.getElementById("movie-select");
const seatsDiv = document.getElementById("seats");
const totalDiv = document.getElementById("total");
const form = document.getElementById("booking-form");

let selectedSeats = [];

function updateSeats() {
  const selectedMovie = movieSelect.value;
  const availableSeats = seats[selectedMovie].available;
  const bookedSeats = seats[selectedMovie].booked;

  seatsDiv.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat");

    if (availableSeats.includes(i)) {
      seatDiv.classList.add("available");
    } else if (bookedSeats.includes(i)) {
      seatDiv.classList.add("booked");
      seatDiv.addEventListener("click", () => {
        selectedSeats = selectedSeats.filter(seat => seat !== i);
        seats[selectedMovie].booked = seats[selectedMovie].booked.filter(seat => seat !== i);
        updateSeats();
        updateTotal();
      });
    }

    if (selectedSeats.includes(i)) {
      seatDiv.classList.add("selected");
    }

    seatDiv.innerText = i;
    seatDiv.addEventListener("click", () => {
      if (availableSeats.includes(i)) {
        if (selectedSeats.includes(i)) {
          selectedSeats = selectedSeats.filter(seat => seat !== i);
          seats[selectedMovie].booked.push(i);
        } else {
          selectedSeats.push(i);
          seats[selectedMovie].booked = seats[selectedMovie].booked.filter(seat => seat !== i);
        }
        updateSeats();
        updateTotal();
      }
    });

    seatsDiv.appendChild(seatDiv);
  }
}
const timerDiv = document.getElementById("timer");

function updateTimer() {
  const now = new Date();
  const nextShow = new Date("2023-05-09T19:00:00"); 
  const diff = nextShow - now;

  if (diff > 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerDiv.innerText = `Next show starts in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
  } else {
    timerDiv.innerText = "The next show has already started.";
  }
}

setInterval(updateTimer, 1000);

function updateTotal() {
  const selectedMovie = movieSelect.value;
  const pricePerSeat = 190;
  const totalPrice = selectedSeats.length * pricePerSeat;

  totalDiv.innerText = `Selected Seats: ${selectedSeats.length} | Total Price: ₹${totalPrice}`;
}

function validateForm(event) {
  if (selectedSeats.length === 0) {
    event.preventDefault();
    alert("Please select at least one seat.");
  }
}

movieSelect.addEventListener("change", () => {
  selectedSeats = [];
  updateSeats();
  updateTotal();
});
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const genreSelect = document.getElementById("genre");


  let movies = [
    { title: "Rudran", genre: "Action" },
    { title: "The Kerala Story", genre: "Thriller" },
    { title: "Kulasami", genre: "Drama" },
    { title: "Pathu Thala", genre: "Crime" },
    { title: "August 16 1947", genre: "Drama" },
    { title: "Viduthalai ", genre: "Drama" },
  ];

 

function displayResults(movies) {
  resultsDiv.innerHTML = "";

  if (movies.length === 0) {
    resultsDiv.innerText = "No results found.";
    return;
  }

  const ul = document.createElement("ul");

  movies.forEach(movie => {
    const li = document.createElement("li");
    li.innerText = `${movie.title} (${movie.genre})`;
    ul.appendChild(li);
  });

  resultsDiv.appendChild(ul);
}

function filterMovies() {
  const query = searchInput.value.trim();
  const genre = genreSelect.value;
  let filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(query.toLowerCase());
  });

  if (genre !== "") {
    filteredMovies = filteredMovies.filter(movie => {
      return movie.genre === genre;
    });
  }

  displayResults(filteredMovies);
}


searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);

displayResults(movies);


form.addEventListener("submit", validateForm);

updateSeats();
updateTotal();
