import React, { useState } from "react";
import "./index.css";

function App() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [thirdText, setThirdText] = useState("");
  const [fourthText, setFourthText] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lista de IDs de templates populares
  const memeTemplates = [
    "181913649", // Drake Hotline Bling
    "112126428", // Distracted Boyfriend
    "87743020", // Two Buttons
    "129242436", // Change My Mind
    "1035805", // Expanding Brain
    "155067746", // Surprised Pikachu
    "93895088", // Buff Doge vs. Cheems
    "131087935", // Running Away Balloon
    "61579", // One Does Not Simply
    "124822590", // Left Exit 12 Off Ramp
  ];

  const generateMeme = async () => {
    setLoading(true);
    setError("");

    // Seleciona um template aleatório
    const templateId = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    const username = "isleneee"; // Substitua pelo seu username do Imgflip
    const password = "8&!yeZ2eJzgS2&#"; // Substitua pela sua senha do Imgflip

    const params = new URLSearchParams();
    params.append("template_id", templateId);
    params.append("username", username);
    params.append("password", password);
    params.append("text0", firstText);
    params.append("text1", secondText);
    params.append("text2", thirdText);
    params.append("text3", fourthText);

    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      console.log("Resposta da API:", data);

      if (data.success) {
        setMemeUrl(data.data.url);
      } else {
        setError(data.error_message || "Erro ao gerar meme.");
      }
    } catch (error) {
      setError("Erro na requisição. Verifique sua conexão.");
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>gerador memes fodas </h1>
      <div className="meme-form">
        <input
          type="text"
          placeholder="insira texto"
          value={firstText}
          onChange={(e) => setFirstText(e.target.value)}
        />
        <input
          type="text"
          placeholder="insira texto"
          value={secondText}
          onChange={(e) => setSecondText(e.target.value)}
        />
        <input
          type="text"
          placeholder="insiraaaaa text"
          value={thirdText}
          onChange={(e) => setThirdText(e.target.value)}
        />
        <input
          type="text"
          placeholder="inaira texto"
          value={fourthText}
          onChange={(e) => setFourthText(e.target.value)}
        />
        <button onClick={generateMeme} disabled={loading}>
          {loading ? "Gerando..." : "Criar Meme"}
        </button>
      </div>
      <p>nao precisa por todos os insira textp</p>
      {error && <p className="error">{error}</p>}
      {memeUrl && (
        <div className="meme-result">
          <img src={memeUrl} alt="Meme gerado" />
          <a href={memeUrl} download="meme.png">
            Baixar Meme
          </a>
        </div>
      )}
    </div>
  );
}

export default App;