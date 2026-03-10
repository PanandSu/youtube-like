// UI Components

// Video preview container (global)
let videoPreviewContainer = null;

// Render video card
function renderVideoCard(video) {
  // Get watch progress if available
  const user = window.auth?.getCurrentUser();
  let watchProgress = 0;
  if (user?.watchHistory) {
    const historyItem = user.watchHistory.find(h => h.videoId === video.id);
    if (historyItem && historyItem.lastPosition) {
      const videoDuration = parseVideoDuration(video.duration);
      watchProgress = (historyItem.lastPosition / videoDuration) * 100;
    }
  }

  return `
    <article class="video-card" data-video-id="${video.id}">
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" data-video-src="${video.videoUrl || ''}">
        <span class="video-duration">${video.duration}</span>
        ${watchProgress > 0 && watchProgress < 95 ? `<div class="watch-progress-bar"><div class="watch-progress" style="width: ${watchProgress}%"></div></div>` : ''}
        <button class="video-menu" aria-label="Video options">
          <i class="ph-fill ph-dots-three-vertical"></i>
        </button>
        <div class="video-preview-tooltip" style="display: none;">
          <div class="preview-video-container">
            <video muted preload="metadata"></video>
            <div class="preview-info">
              <span class="preview-title">${video.title.substring(0, 50)}${video.title.length > 50 ? '...' : ''}</span>
              <span class="preview-channel">${video.channel.name}</span>
            </div>
          </div>
        </div>
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

// Parse video duration string to seconds
function parseVideoDuration(duration) {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return 0;
}

// Setup video preview on hover
function setupVideoPreview() {
  const previewContainer = document.createElement('div');
  previewContainer.className = 'video-preview-container';
  previewContainer.style.display = 'none';
  document.body.appendChild(previewContainer);
  videoPreviewContainer = previewContainer;

  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.video-card');
    if (!card) return;

    const thumbnail = card.querySelector('.video-thumbnail');
    const tooltip = thumbnail.querySelector('.video-preview-tooltip');
    if (!tooltip) return;

    const videoSrc = thumbnail.querySelector('img').dataset.videoSrc;
    if (!videoSrc) return;

    // Show tooltip
    tooltip.style.display = 'block';

    // Setup preview video
    const previewVideo = tooltip.querySelector('video');
    if (previewVideo && previewVideo.src !== videoSrc) {
      previewVideo.src = videoSrc;

      previewVideo.addEventListener('loadedmetadata', () => {
        // Update duration display
      }, { once: true });
    }

    // Position tooltip
    const rect = thumbnail.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = rect.left + 'px';
    tooltip.style.width = rect.width + 'px';
    tooltip.style.zIndex = '1000';

    // Try to play preview
    previewVideo.play().catch(() => {});
  });

  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.video-card');
    if (!card) return;

    const thumbnail = card.querySelector('.video-thumbnail');
    const tooltip = thumbnail?.querySelector('.video-preview-tooltip');
    const previewVideo = tooltip?.querySelector('video');

    if (tooltip) {
      tooltip.style.display = 'none';
    }
    if (previewVideo) {
      previewVideo.pause();
      previewVideo.currentTime = 0;
    }
  });
}

// Initialize video previews
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(setupVideoPreview, 1000);
});

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
  const replies = comment.replies || [];
  let repliesHtml = '';

  if (replies.length > 0) {
    repliesHtml = `<div class="comment-replies">${replies.map(reply => renderReply(reply)).join('')}</div>`;
  }

  // Check if user has liked this comment
  const user = window.auth?.getCurrentUser();
  const likedComments = user?.likedComments || [];
  const isLiked = likedComments.includes(comment.id);

  // Parse comment text for timestamps and make them clickable
  const commentText = parseCommentTimestamps(comment.text);

  return `
    <div class="comment" data-comment-id="${comment.id}">
      <img class="comment-avatar" src="${comment.avatar}" alt="${comment.author}">
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">${comment.author}</span>
          <span class="comment-time">${utils.timeAgo(comment.uploadedAt)}</span>
        </div>
        <p class="comment-text">${commentText}</p>
        <div class="comment-actions">
          <button class="comment-like ${isLiked ? 'liked' : ''}" data-comment-id="${comment.id}">
            <i class="ph-fill ph-thumbs-up"></i>
            <span class="like-count">${comment.likes || 0}</span>
          </button>
          <button class="comment-reply">Reply</button>
        </div>
        ${repliesHtml}
      </div>
    </div>
  `;
}

// Parse comment text for timestamps and make them clickable
function parseCommentTimestamps(text) {
  // Match patterns like 1:23, 1:23:45, 0:45, etc.
  const timestampRegex = /(\d{1,2}:)?(\d{1,2}):(\d{2})/g;
  return text.replace(timestampRegex, (match) => {
    return `<span class="comment-timestamp" data-timestamp="${match}">${match}</span>`;
  });
}

// Render reply
function renderReply(reply) {
  // Check if user has liked this reply
  const user = window.auth?.getCurrentUser();
  const likedComments = user?.likedComments || [];
  const isLiked = likedComments.includes(reply.id);

  return `
    <div class="comment" data-comment-id="${reply.id}">
      <img class="comment-avatar" src="${reply.avatar}" alt="${reply.author}" style="width: 32px; height: 32px;">
      <div class="comment-content">
        <div class="comment-header">
          <span class="comment-author">${reply.author}</span>
          <span class="comment-time">${utils.timeAgo(reply.uploadedAt)}</span>
        </div>
        <p class="comment-text">${reply.text}</p>
        <div class="comment-actions">
          <button class="comment-like ${isLiked ? 'liked' : ''}" data-comment-id="${reply.id}">
            <i class="ph-fill ph-thumbs-up"></i>
            <span class="like-count">${reply.likes || 0}</span>
          </button>
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

  // Setup video previews
  setupVideoPreview();

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.video-menu')) {
        const videoId = card.dataset.videoId;
        openVideoPlayer(videoId);
      }
    });

    // Add video menu click handler
    const menuBtn = card.querySelector('.video-menu');
    if (menuBtn) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const videoId = card.dataset.videoId;
        showVideoOptionsMenu(videoId, e);
      });
    }
  });

  // Add channel click handlers
  grid.querySelectorAll('.video-channel').forEach(channelLink => {
    channelLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const channelId = channelLink.dataset.channelId;
      openChannelPage(channelId);
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

// Render subscriptions grid
function renderSubscriptionsGrid(subscriptions) {
  return subscriptions.map(channel => `
    <div class="subscription-card" data-channel-id="${channel.id}">
      <img src="${channel.avatar}" alt="${channel.name}">
      <h3>${channel.name}</h3>
      <p>Subscribed</p>
    </div>
  `).join('');
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
  const descText = video.description || '';
  const maxLength = 150;
  const showMoreBtn = document.getElementById('showMoreBtn');

  if (descText.length > maxLength) {
    descEl.querySelector('p').textContent = descText.substring(0, maxLength) + '...';
    if (showMoreBtn) {
      showMoreBtn.style.display = 'block';
      showMoreBtn.textContent = 'Show more';
      showMoreBtn.onclick = () => {
        if (showMoreBtn.textContent === 'Show more') {
          descEl.querySelector('p').textContent = descText;
          showMoreBtn.textContent = 'Show less';
        } else {
          descEl.querySelector('p').textContent = descText.substring(0, maxLength) + '...';
          showMoreBtn.textContent = 'Show more';
        }
      };
    }
  } else {
    descEl.querySelector('p').textContent = descText;
    if (showMoreBtn) {
      showMoreBtn.style.display = 'none';
    }
  }

  // Render video chapters
  renderVideoChapters(video);
}

// Render video chapters
function renderVideoChapters(video) {
  const chaptersSection = document.getElementById('videoChapters');
  const chaptersList = document.getElementById('chaptersList');

  // Generate default chapters for demo if none exist
  let chapters = video.chapters || [];

  // If no chapters, generate some based on video duration
  if (chapters.length === 0 && video.duration) {
    const durationSecs = parseVideoDuration(video.duration);
    if (durationSecs > 60) {
      chapters = [
        { time: 0, title: 'Introduction', description: '' },
        { time: Math.floor(durationSecs * 0.2), title: 'Main Content', description: '' },
        { time: Math.floor(durationSecs * 0.5), title: 'Deep Dive', description: '' },
        { time: Math.floor(durationSecs * 0.8), title: 'Conclusion', description: '' }
      ];
    }
  }

  if (chapters.length === 0) {
    chaptersSection.style.display = 'none';
    return;
  }

  chaptersSection.style.display = 'block';

  chaptersList.innerHTML = chapters.map((chapter, index) => `
    <div class="chapter-item" data-time="${chapter.time}">
      <div class="chapter-thumbnail">
        <img src="${video.thumbnail}" alt="Chapter thumbnail">
        <span class="chapter-time">${formatTime(chapter.time)}</span>
      </div>
      <div class="chapter-info">
        <span class="chapter-title">${chapter.title}</span>
        ${chapter.description ? `<span class="chapter-description">${chapter.description}</span>` : ''}
      </div>
    </div>
  `).join('');

  // Add click handlers to seek to chapter
  chaptersList.querySelectorAll('.chapter-item').forEach(item => {
    item.addEventListener('click', () => {
      const time = parseInt(item.dataset.time);
      if (window.seekToTime) {
        window.seekToTime(time);
      }
    });
  });
}

function parseVideoDuration(duration) {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return 0;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Export components
window.components = {
  renderVideoCard,
  renderRecommendationCard,
  renderComment,
  renderReply,
  renderVideoGrid,
  renderRecommendations,
  renderComments,
  updateVideoPlayerInfo
};
