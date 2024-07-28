document.getElementById("getNumberBtn").addEventListener("click", () => {
  const apiUrl = "http://localhost:3000/getMobile";
  const pollInterval = 5000; // 5 seconds
  const maxAttempts = 12; // Poll for 1 minute (12 * 5 seconds)

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("getMobile response:", data); // Log the response data for debugging

      if (data && data.code === 200) {
        const phoneNumber = data.data;
        document.getElementById(
          "result"
        ).textContent = `Cowboy Phone Number: ${phoneNumber}`;
        pollForVerificationCode(phoneNumber, pollInterval, maxAttempts);
      } else {
        throw new Error("Failed to get the phone number. " + data.msg);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").textContent =
        "An error occurred. Please try again.";
    });
});

function pollForVerificationCode(phoneNumber, pollInterval, maxAttempts) {
  let attempts = 0;

  const intervalId = setInterval(() => {
    if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      document.getElementById("result").textContent +=
        ", Failed to get the verification code in time.";
      return;
    }

    fetch(`http://localhost:3000/getMsg?pn=${phoneNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("getMsg response:", data); // Log the response data for debugging

        if (data && data.code === 200) {
          clearInterval(intervalId);
          document.getElementById(
            "result"
          ).textContent += `, Verification Code: ${data.msg}`;
        } else if (data && data.code === 908) {
          console.log("SMS not found. Retrying...");
        } else {
          clearInterval(intervalId);
          document.getElementById("result").textContent +=
            ", Failed to get the verification code.";
        }
      })
      .catch((error) => {
        clearInterval(intervalId);
        console.error("Error:", error);
        document.getElementById("result").textContent +=
          ", An error occurred while polling. Please try again.";
      });

    attempts++;
  }, pollInterval);
}
