// UI Components

// Render video card
function renderVideoCard(video) {
  return `
    <article class="video-card" data-video-id="${video.id}">
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${video.duration}</span>
        <button class="video-menu" aria-label="Video options">
          <i class="ph-fill ph-dots-three-vertical"></i>
        </button>
      </div>
      <div class="video-details">
        <div class="video-avatar">
          <img src="${video.channel.avatar}" alt="${video.channel.name}">
        </div>
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
          <a href="#" class="video-channel" data-channel-id="${video.channel.id}">${video.channel.name}</a>
          <div class="video-meta">
            <span>${utils.formatNumber(video.views)} views</span>
            <span>•</span>
            <span>${utils.timeAgo(video.uploadedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Render recommendation card
function renderRecommendationCard(video) {
  return `
    <div class="recommendation-card" data-video-id="${video.id}">
      <div class="recommendation-thumb">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
      </div>
      <div class="recommendation-info">
        <h4 class="recommendation-title">${video.title}</h4>
        <p class="recommendation-channel">${video.channel.name}</p>
        <p class="recommendation-meta">
          ${utils.formatNumber(video.views)} views • ${utils.timeAgo(video.uploadedAt)}
        </p>
      </div>
    </div>
  `;
}

// Render comment
function renderComment(comment) {
  return `
    <div class="comment" data-comment-id="${comment.id}">
      <img class="comment-avatar" src="${comment.avatar}" alt="${comment.author}">
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">${comment.author}</span>
          <span class="comment-time">${utils.timeAgo(comment.uploadedAt)}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
        <div class="comment-actions">
          <button class="comment-like">
            <i class="ph-fill ph-thumbs-up"></i>
            <span>${comment.likes}</span>
          </button>
          <button class="comment-reply">Reply</button>
        </div>
      </div>
    </div>
  `;
}

// Render video grid
function renderVideoGrid(videosToRender) {
  const grid = document.getElementById('videoGrid');
  const emptyState = document.getElementById('emptyState');

  if (videosToRender.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = videosToRender.map(renderVideoCard).join('');

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.video-menu')) {
        const videoId = card.dataset.videoId;
        openVideoPlayer(videoId);
      }
    });
  });
}

// Render recommendations
function renderRecommendations(videoId) {
  const list = document.getElementById('recommendationsList');
  const recommendations = utils.getRecommendations(videoId, 12);
  list.innerHTML = recommendations.map(renderRecommendationCard).join('');

  // Add click handlers
  list.querySelectorAll('.recommendation-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      openVideoPlayer(videoId);
    });
  });
}

// Render comments
function renderComments(comments) {
  const list = document.getElementById('commentsList');
  const countEl = document.getElementById('commentCount');

  countEl.textContent = comments.length;
  list.innerHTML = comments.map(renderComment).join('');
}

// Update video info in player
function updateVideoPlayerInfo(video) {
  document.getElementById('videoTitle').textContent = video.title;
  document.getElementById('videoViews').textContent = `${utils.formatNumber(video.views)} views`;
  document.getElementById('likeCount').textContent = utils.formatNumber(video.likes);

  const likeBtn = document.getElementById('likeBtn');
  likeBtn.classList.toggle('active', video.liked);

  document.getElementById('channelAvatar').src = video.channel.avatar;
  document.getElementById('channelName').textContent = video.channel.name;
  document.getElementById('subscriberCount').textContent = utils.formatSubscribers(video.channel.subscribers);

  const subscribeBtn = document.getElementById('subscribeBtn');
  subscribeBtn.classList.toggle('subscribed', video.subscribed);
  subscribeBtn.querySelector('span').textContent = video.subscribed ? 'Subscribed' : 'Subscribe';

  const descEl = document.getElementById('videoDescription');
  descEl.querySelector('p').textContent = video.description;
}

// Export components
window.components = {
  renderVideoCard,
  renderRecommendationCard,
  renderComment,
  renderVideoGrid,
  renderRecommendations,
  renderComments,
  updateVideoPlayerInfo
};
