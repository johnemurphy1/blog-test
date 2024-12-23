const blogForm = document.getElementById('blog-form');
        const postsPage = document.getElementById('posts-page');
        const landingPage = document.getElementById('landing-page');
        const postsContainer = document.querySelector('.posts');
        const backButton = document.getElementById('back-button');
        const themeToggle = document.getElementById('theme-toggle');

        // Handle form submission
        blogForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const title = document.getElementById('title').value.trim();
            const content = document.getElementById('content').value.trim();

            if (!username || !title || !content) {
                alert('Please complete all fields.');
                return;
            }

            const post = { username, title, content };
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            posts.push(post);
            localStorage.setItem('blogPosts', JSON.stringify(posts));

            blogForm.reset();
            showPostsPage();
        });

        // Display posts
        function displayPosts() {
            postsContainer.innerHTML = '';
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

            if (posts.length === 0) {
                postsContainer.innerHTML = '<p>No posts available.</p>';
                return;
            }

            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <p><strong>Author:</strong> ${post.username}</p>
                `;
                postsContainer.appendChild(postDiv);
            });
        }

        // Toggle theme
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
        });

        // Show posts page
        function showPostsPage() {
            landingPage.classList.add('hidden');
            postsPage.classList.remove('hidden');
            displayPosts();
        }

        // Back to landing page
        backButton.addEventListener('click', function () {
            postsPage.classList.add('hidden');
            landingPage.classList.remove('hidden');
        });
