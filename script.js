const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// 1. Initialize progress from Session Storage or an empty object
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// 2. Function to render the quiz
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach((choice) => {
      const isChecked = userAnswers[index] === choice ? "checked" : "";
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${index}`;
      choiceElement.value = choice;
      if (isChecked) choiceElement.checked = true;

      // Event listener to save progress immediately
      choiceElement.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.append(choice);
      
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionDiv);
  });
}

// 3. Function to calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of 5.`;
  scoreElement.textContent = scoreText;
  
  // Store final score in Local Storage
  localStorage.setItem("score", score);
}

// 4. Persistence check: show previous score if it exists
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.textContent = `Your score is ${lastScore} out of 5.`;
}

// Event listener for submission
submitButton.addEventListener("click", calculateScore);

// Initial Render
renderQuestions();