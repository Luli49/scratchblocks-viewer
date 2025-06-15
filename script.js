function updateImage() {
  const code = document.getElementById("code").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = '';
  // Changé : création et manipulation de l'élément temporaire
  // Avant : mélange entre définir innerText et rendre immédiatement
  // Maintenant : text -> render -> append
  const tempDiv = document.createElement('div');
  tempDiv.innerText = code; // Définit le contenu texte avant le rendu
  scratchblocks.render(tempDiv, { style: 'scratch3' }); // Rend directement en SVG
  outputDiv.appendChild(tempDiv); // Ajoute l'élément rendu au DOM
  // Changé : utilisation d'un setTimeout pour attendre le rendu complet
  // Avant : possible problème de synchronisation avec querySelector('svg')
  setTimeout(() => {
    const svg = tempDiv.querySelector('svg'); // Récupère le SVG rendu
    if (svg) {
      const svgString = new XMLSerializer().serializeToString(svg);
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      const img = document.createElement('img');
      img.src = dataUrl;
      img.alt = "Script Scratchblocks";
      img.width = 400;
      outputDiv.appendChild(img);
    } else {
      outputDiv.innerHTML += '<p>Erreur : aucun SVG généré.</p>';
    }
  }, 200); // Changé : ajout d'une temporisation pour laisser le temps au rendu
}
// Changé : structure de l'initialisation au chargement
// Avant : inline dans le HTML (via <script>)
// Maintenant : dans un fichier JS séparé
window.onload = () => {
  updateImage(); // Appelle la fonction une première fois
  document.getElementById("code").addEventListener("input", updateImage);
};
