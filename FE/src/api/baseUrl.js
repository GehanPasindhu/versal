const baseurl = import.meta.env.VITE_BASE_URL;

export const register = async () => {
  try {
    const res = await fetch("http://localhost:8888/.netlify/functions/app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensures backend can parse JSON
      },
      body: JSON.stringify({
        user_id: "12khfrkjerkojlk3",
        password: "geh34jk34jlan",
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      console.log("201: User registered successfully");
    } else {
      console.log("Registration failed:", data.message);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};
