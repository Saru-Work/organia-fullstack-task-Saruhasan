export async function fetchUser() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/auth/getMe", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
}
