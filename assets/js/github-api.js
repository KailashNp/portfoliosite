/* github-api.js - GitHub Stats & Repos */

document.addEventListener('DOMContentLoaded', () => {
  const username = 'KailashNp';
  const url = `https://api.github.com/users/${username}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Use data to populate something, maybe footer stats
      const footer = document.querySelector('.footer-right .social-links');
      if (footer) {
        footer.innerHTML += `<span>Public Repos: ${data.public_repos}</span>`;
      }
    })
    .catch(error => console.error('GitHub API error:', error));
});
