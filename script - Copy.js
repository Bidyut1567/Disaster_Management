
function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
  
    if (username === "" || password === "") {
      alert("Please fill all fields.");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find(user => user.username === username);
  
    if (existing) {
      alert("Username already exists!");
      return;
    }
  
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  }
  
  function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      localStorage.setItem("currentUser", username);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  }
  
  function applyForScheme(schemeName) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("Please login to apply.");
      window.location.href = "login.html";
      return;
    }
  
    const appliedSchemes = JSON.parse(localStorage.getItem("appliedSchemes_" + currentUser) || "[]");
    const alreadyApplied = appliedSchemes.find(s => s.name === schemeName);
  
    if (alreadyApplied) {
      alert("You already applied for this scheme.");
      return;
    }
  
    const newApplication = {
      id: "APP" + Date.now(),
      name: schemeName
    };
  
    appliedSchemes.push(newApplication);
    localStorage.setItem("appliedSchemes_" + currentUser, JSON.stringify(appliedSchemes));
    alert("Scheme applied successfully!");
  }

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
  
  function submitFeedback() {
    const feedback = document.getElementById("feedbackText").value.trim();
    const user = localStorage.getItem("currentUser");
  
    if (!user) {
      alert("Please log in to submit feedback.");
      window.location.href = "login.html";
      return;
    }
  
    if (feedback === "") {
      document.getElementById("feedbackMsg").textContent = "❌ Please write something!";
      return;
    }
  
    const feedbackData = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbackData.push({
      user: user,
      message: feedback,
      time: new Date().toLocaleString()
    });
  
    localStorage.setItem("feedbacks", JSON.stringify(feedbackData));
    document.getElementById("feedbackMsg").textContent = "✅ Thank you for your feedback!";
    document.getElementById("feedbackText").value = "";
  }

  function submitDisasterReport() {
    const reportText = document.getElementById("disasterReport").value.trim();
    const user = localStorage.getItem("currentUser");
  
    if (!user) {
      alert("Please log in to report a disaster.");
      window.location.href = "login.html";
      return;
    }
  
    if (reportText === "") {
      document.getElementById("reportMsg").textContent = "❌ Please enter disaster details.";
      return;
    }
  
    const reports = JSON.parse(localStorage.getItem("disasterReports") || "[]");
    reports.push({
      user: user,
      report: reportText,
      time: new Date().toLocaleString()
    });
  
    localStorage.setItem("disasterReports", JSON.stringify(reports));
    document.getElementById("reportMsg").textContent = "✅ Your report has been submitted!";
    document.getElementById("disasterReport").value = "";
  }
  