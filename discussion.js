// Discussion data structure
let discussions = JSON.parse(localStorage.getItem('discussions')) || [];

// Function to create a discussion element
function createDiscussionElement(discussion) {
  const discussionDiv = document.createElement('div');
  discussionDiv.className = 'card mb-3';
  discussionDiv.innerHTML = `
    <div class="card-body">
      <h4 class="card-title">${discussion.title}</h4>
      <p class="card-text">${discussion.content}</p>
      <small class="text-muted">Posted on ${new Date(discussion.date).toLocaleString()}</small>
      
      <!-- Reply Form -->
      <form class="reply-form mt-3">
        <div class="mb-2">
          <textarea class="form-control" rows="2" placeholder="Write a reply..." required></textarea>
        </div>
        <button type="submit" class="btn btn-sm btn-outline-primary">Reply</button>
      </form>

      <!-- Replies Section -->
      <div class="replies mt-3">
        ${discussion.replies.map(reply => `
          <div class="card mb-2">
            <div class="card-body">
              <p class="card-text">${reply.content}</p>
              <small class="text-muted">Replied on ${new Date(reply.date).toLocaleString()}</small>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Add reply functionality
  const replyForm = discussionDiv.querySelector('.reply-form');
  replyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const replyContent = replyForm.querySelector('textarea').value;
    if (replyContent.trim()) {
      const reply = {
        content: replyContent,
        date: new Date().toISOString()
      };
      discussion.replies.push(reply);
      saveDiscussions();
      renderDiscussions();
    }
  });

  return discussionDiv;
}

// Function to render all discussions
function renderDiscussions() {
  const discussionsList = document.getElementById('discussionsList');
  discussionsList.innerHTML = '';
  discussions.forEach(discussion => {
    discussionsList.appendChild(createDiscussionElement(discussion));
  });
}

// Function to save discussions to localStorage
function saveDiscussions() {
  localStorage.setItem('discussions', JSON.stringify(discussions));
}

// Handle new discussion form submission
document.getElementById('newDiscussionForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (title.trim() && content.trim()) {
    const discussion = {
      title,
      content,
      date: new Date().toISOString(),
      replies: []
    };

    discussions.unshift(discussion); // Add to beginning of array
    saveDiscussions();
    renderDiscussions();
    e.target.reset();
  }
});

// Initial render
renderDiscussions(); 