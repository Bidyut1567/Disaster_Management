function submitDisasterReport() {
    const reportText = document.getElementById("disasterReport").value.trim();
    const user = localStorage.getItem("currentUser");
  
    if (!user) {
      alert("🚫 Please log in to report a disaster.");
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
  