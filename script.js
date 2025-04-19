const facts = [
    "HTML stands for HyperText Markup Language.",
    "CSS can be used to create animations!",
    "JavaScript was created in just 10 days.",
    "Bootstrap was originally developed at Twitter.",
    "Semantic HTML improves accessibility.",
    "The first website ever is still online: info.cern.ch",
    "JavaScript and Java are completely different languages!"
  ];
  
  function rotateFact() {
    const factBox = document.getElementById("fun-fact");
    if (!factBox) return;
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factBox.innerText = "💡 " + randomFact;
  }
  
  // Call once immediately, then every 6 seconds
  rotateFact();
  setInterval(rotateFact, 6000);
  