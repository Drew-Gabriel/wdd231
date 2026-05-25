console.log("join.js working");

// Hidden timestamp
const timestamp = document.getElementById("timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}
