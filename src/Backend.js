import axios from "axios";

export const storeToken = (token) => {
  sessionStorage.setItem("token", token);
  console.log("Token stored:", token); // Log the stored token
};

export const getToken = () => {
  const token = sessionStorage.getItem("token");
  console.log("Retrieved token:", token); // Log the retrieved token
  return token;
};

export const storeUsername = (username) => {
  sessionStorage.setItem("username", username);
  console.log("Username stored:", username); // Log the stored username
}

export const getUsername = () => {
  const username = sessionStorage.getItem("username");
  console.log("Retrieved username:", username); // Log the retrieved username
  return username;
}

export async function getAuth(username, password) {
  try {
    const request = `http://localhost:8080/api/auth/token?username=${username}&password=${password}`;
    console.log("Sending request to:", request); // Log the request URL
    const response = await axios.get(request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log("Response data:", data); // Log the response data
    const token = data.jwt;
    console.log("Received token:", token); // Log the received token
    return token;
  } catch (error) {
    console.error("Error during authentication:", error); // Log any errors
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function getCalculate(token, equation) {
  console.log("Using token:", token); // Log the token being used for debugging
  const request = `http://localhost:8080/api/calculate?jwt=${token}&equation=${equation}`;
  const response = await axios.get(request, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  console.log(data);
  const result = data.result;
  console.log(result);
  return result;
}

export async function getFetch(token) {
  console.log("Using token:", token); // Log the token being used for debugging
  const request = `http://localhost:8080/api/fetch?jwt=${token}`;
  const response = await axios.get(request, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  const equations = data.equations;
  const results = data.results;
  const history = [];
  for (let i = 0; i < equations.length; i++) {
    history.push(`${equations[i]} = ${results[i]}`);
  }
  return history;
}

export async function postContact(token, name, email, message) {
  console.log("Using token:", token); // Log the token being used for debugging
  const request = `http://localhost:8080/api/contact?jwt=${token}&name=${name}&email=${email}&message=${message}`;
  const response = await axios.post(request, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = response.data;
  return result;
}

export async function getValidate(token) {
  try {
    console.log("Using token:", token); // Log the token being used for debugging
    const request = `http://localhost:8080/api/auth/validate?jwt=${token}`;
    const response = await axios.get(request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error during validation:", error); // Log any errors
    throw error; // Rethrow the error to handle it in the calling function
  }
}
