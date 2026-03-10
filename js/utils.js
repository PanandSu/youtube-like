// Utility functions

// Format number with K, M, B suffixes
function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// Format time ago
function timeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years + ' year' + (years > 1 ? 's' : '') + ' ago';
  if (months > 0) return months + ' month' + (months > 1 ? 's' : '') + ' ago';
  if (weeks > 0) return weeks + ' week' + (weeks > 1 ? 's' : '') + ' ago';
  if (days > 0) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  if (hours > 0) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
  if (minutes > 0) return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
  return 'Just now';
}

// Format subscriber count
function formatSubscribers(num) {
  return formatNumber(num) + ' subscribers';
}

// Format time for video player
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Show toast notification
function showToast(message, type = 'default', duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  toast.className = 'toast';
  if (type !== 'default') {
    toast.classList.add(type);
  }

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Random delay simulation
function simulateNetworkDelay(min = 300, max = 800) {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Generate unique ID
function generateId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

// Filter videos based on category and search query
function filterVideos(videos, category, query) {
  return videos.filter(video => {
    const matchesCategory = category === 'all' || video.category === category;
    const matchesSearch = query === '' ||
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.channel.name.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesSearch;
  });
}

// Get recommendations (videos excluding current)
function getRecommendations(currentVideoId, limit = 10) {
  return videos
    .filter(v => v.id !== currentVideoId)
    .slice(0, limit);
}

// Playback speeds
const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// Local storage helpers
function getFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('Could not save to localStorage');
  }
}

// Export utilities
window.utils = {
  formatNumber,
  timeAgo,
  formatSubscribers,
  formatTime,
  debounce,
  showToast,
  simulateNetworkDelay,
  generateId,
  filterVideos,
  getRecommendations,
  playbackSpeeds,
  getFromStorage,
  saveToStorage
};
