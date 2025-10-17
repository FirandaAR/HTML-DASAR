async function cariHewan() {
  const query = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!query) {
    resultDiv.innerHTML = "<p>❌ Masukkan nama hewan terlebih dahulu!</p>";
    return;
  }

  try {
    // Wikipedia Bahasa Indonesia API
    const response = await fetch(
      `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (!response.ok) throw new Error("Hewan tidak ditemukan!");

    const data = await response.json();

    resultDiv.innerHTML = `
      <h2>${data.title}</h2>
      ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}">` : ""}
      <p>${data.extract}</p>
      <p><strong>Sumber:</strong> <a href="${data.content_urls.desktop.page}" target="_blank">Wikipedia Indonesia</a></p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>❌ Tidak ditemukan: ${query}</p>`;
  }
}
