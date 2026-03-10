// Main Application

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoriesBar = document.getElementById('categoriesBar');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const cancelUpload = document.getElementById('cancelUpload');
const submitUpload = document.getElementById('submitUpload');
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');
const previewVideo = document.getElementById('previewVideo');
const removeVideo = document.getElementById('removeVideo');
const uploadForm = document.getElementById('uploadForm');
const uploadProgress = document.getElementById('uploadProgress');
const uploadProgressBar = document.getElementById('uploadProgressBar');
const uploadProgressText = document.getElementById('uploadProgressText');
const videoGrid = document.getElementById('videoGrid');
const videoPlayerPage = document.getElementById('videoPlayerPage');
const mainContent = document.querySelector('.main-content');
const videoElement = document.getElementById('videoElement');

// Player elements
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progressBar');
const progressFilled = document.getElementById('progressFilled');
const progressHandle = document.getElementById('progressHandle');
const timeDisplay = document.getElementById('timeDisplay');
const playbackSpeedBtn = document.getElementById('playbackSpeedBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Action buttons
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const subscribeBtn = document.getElementById('subscribeBtn');

// State
let isPlaying = false;
let currentPlaybackSpeed = 1;
let currentVolume = 1;
let isMuted = false;
let selectedFile = null;
let currentSpeedIndex = 2; // 1x
let currentVideo = null;
let currentCategory = 'All';
let searchQuery = '';

// Initialize app
async function init() {
  await loadVideos();
  setupEventListeners();
  setupPlayerControls();
}

// Load and render videos
async function loadVideos() {
  await utils.simulateNetworkDelay();
  const filteredVideos = utils.filterVideos(videos, currentCategory, searchQuery);
  components.renderVideoGrid(filteredVideos);
}

// Setup event listeners
function setupEventListeners() {
  // Sidebar toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Search
  const handleSearch = utils.debounce(() => {
    searchQuery = searchInput.value;
    loadVideos();
  }, 300);

  searchInput.addEventListener('input', handleSearch);
  searchBtn.addEventListener('click', () => {
    searchQuery = searchInput.value;
    loadVideos();
  });

  // Categories
  categoriesBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;

    categoriesBar.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    currentCategory = chip.dataset.category;
    loadVideos();
  });

  // Upload modal
  uploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
    resetUploadForm();
  });

  closeUploadModal.addEventListener('click', closeModal);
  cancelUpload.addEventListener('click', closeModal);
  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeModal();
  });

  // Upload zone
  uploadZone.addEventListener('click', () => fileInput.click());
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = 'var(--accent-primary)';
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = '';
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      handleFileSelect(file);
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  });

  removeVideo.addEventListener('click', () => {
    selectedFile = null;
    previewVideo.src = '';
    uploadPreview.style.display = 'none';
    uploadZone.style.display = 'flex';
    uploadForm.style.display = 'none';
    submitUpload.disabled = true;
  });

  submitUpload.addEventListener('click', handleUpload);

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Go back to home
      showHomePage();
    });
  });
}

// File selection
function handleFileSelect(file) {
  selectedFile = file;
  const url = URL.createObjectURL(file);
  previewVideo.src = url;
  uploadPreview.style.display = 'block';
  uploadZone.style.display = 'none';
  uploadForm.style.display = 'flex';
  submitUpload.disabled = false;
}

// Reset upload form
function resetUploadForm() {
  selectedFile = null;
  previewVideo.src = '';
  uploadPreview.style.display = 'none';
  uploadZone.style.display = 'flex';
  uploadForm.style.display = 'none';
  uploadProgress.style.display = 'none';
  uploadProgressBar.style.width = '0';
  submitUpload.disabled = true;

  document.getElementById('videoTitleInput').value = '';
  document.getElementById('videoDescriptionInput').value = '';
  document.getElementById('videoCategoryInput').value = '';
  document.getElementById('videoTagsInput').value = '';
}

// Close modal
function closeModal() {
  uploadModal.style.display = 'none';
  resetUploadForm();
}

// Handle upload
async function handleUpload() {
  const title = document.getElementById('videoTitleInput').value.trim();
  const description = document.getElementById('videoDescriptionInput').value.trim();
  const category = document.getElementById('videoCategoryInput').value;
  const tags = document.getElementById('videoTagsInput').value.split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !category) {
    utils.showToast('Please fill in required fields', 'error');
    return;
  }

  uploadForm.style.display = 'none';
  uploadPreview.style.display = 'none';
  uploadProgress.style.display = 'block';

  // Simulate upload progress
  for (let i = 0; i <= 100; i += 5) {
    await new Promise(r => setTimeout(r, 100));
    uploadProgressBar.style.width = i + '%';
    uploadProgressText.textContent = `Uploading... ${i}%`;
  }

  // Add new video to list
  const newVideo = {
    id: utils.generateId(),
    title,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&h=360&fit=crop',
    duration: '0:00',
    views: 0,
    uploadedAt: new Date(),
    channel: {
      id: 'user',
      name: 'Your Channel',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      subscribers: 0
    },
    description,
    tags,
    category,
    videoUrl: URL.createObjectURL(selectedFile),
    likes: 0,
    liked: false,
    subscribed: false
  };

  videos.unshift(newVideo);
  utils.showToast('Video uploaded successfully!', 'success');
  closeModal();
  loadVideos();
}

// Player controls
function setupPlayerControls() {
  playPauseBtn.addEventListener('click', togglePlay);

  volumeBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    videoElement.muted = isMuted;
    volumeBtn.innerHTML = isMuted
      ? '<i class="ph-fill ph-speaker-x"></i>'
      : '<i class="ph-fill ph-speaker-high"></i>';
  });

  volumeSlider.addEventListener('input', (e) => {
    currentVolume = e.target.value / 100;
    videoElement.volume = currentVolume;
    if (currentVolume === 0) {
      isMuted = true;
      volumeBtn.innerHTML = '<i class="ph-fill ph-speaker-x"></i>';
    } else {
      isMuted = false;
      volumeBtn.innerHTML = '<i class="ph-fill ph-speaker-high"></i>';
    }
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoElement.currentTime = pos * videoElement.duration;
  });

  videoElement.addEventListener('timeupdate', () => {
    const percent = (videoElement.currentTime / videoElement.duration) * 100;
    progressFilled.style.width = percent + '%';
    progressHandle.style.left = percent + '%';
    timeDisplay.textContent = `${utils.formatTime(videoElement.currentTime)} / ${utils.formatTime(videoElement.duration)}`;
  });

  videoElement.addEventListener('ended', () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    // Auto-play next video
    if (currentVideo) {
      const recommendations = utils.getRecommendations(currentVideo.id, 1);
      if (recommendations.length > 0) {
        openVideoPlayer(recommendations[0].id);
      }
    }
  });

  playbackSpeedBtn.addEventListener('click', () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % utils.playbackSpeeds.length;
    currentPlaybackSpeed = utils.playbackSpeeds[currentSpeedIndex];
    videoElement.playbackRate = currentPlaybackSpeed;
    playbackSpeedBtn.querySelector('span').textContent = currentPlaybackSpeed + 'x';
  });

  fullscreenBtn.addEventListener('click', () => {
    const player = document.getElementById('mainPlayer');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  });

  // Action buttons
  likeBtn.addEventListener('click', () => {
    if (!currentVideo) return;
    currentVideo.liked = !currentVideo.liked;
    currentVideo.likes += currentVideo.liked ? 1 : -1;
    components.updateVideoPlayerInfo(currentVideo);
  });

  dislikeBtn.addEventListener('click', () => {
    utils.showToast('Dislike recorded');
  });

  shareBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    utils.showToast('Link copied to clipboard!');
  });

  saveBtn.addEventListener('click', () => {
    saveBtn.classList.toggle('active');
    const saved = saveBtn.classList.contains('active');
    utils.showToast(saved ? 'Added to saved videos' : 'Removed from saved videos');
  });

  subscribeBtn.addEventListener('click', () => {
    if (!currentVideo) return;
    currentVideo.subscribed = !currentVideo.subscribed;
    currentVideo.channel.subscribers += currentVideo.subscribed ? 1 : 0;
    components.updateVideoPlayerInfo(currentVideo);
  });
}

function togglePlay() {
  if (isPlaying) {
    videoElement.pause();
    playPauseBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
  } else {
    videoElement.play();
    playPauseBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
  }
  isPlaying = !isPlaying;
}

// Open video player
function openVideoPlayer(videoId) {
  currentVideo = videos.find(v => v.id === videoId);
  if (!currentVideo) return;

  // Increment view count
  currentVideo.views++;

  // Hide main content, show player
  mainContent.style.display = 'none';
  videoPlayerPage.style.display = '';
  videoPlayerPage.classList.add('active');

  // Load video
  videoElement.src = currentVideo.videoUrl;
  components.updateVideoPlayerInfo(currentVideo);
  components.renderRecommendations(videoId);
  components.renderComments(window.mockData.comments);

  // Auto-play
  videoElement.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';

  // Update URL
  window.history.pushState({}, '', `?v=${videoId}`);
}

// Show home page
function showHomePage() {
  mainContent.style.display = 'block';
  videoPlayerPage.classList.remove('active');

  if (videoElement.src) {
    videoElement.pause();
    videoElement.src = '';
  }
  currentVideo = null;

  window.history.pushState({}, '', window.location.pathname);
}

// Handle browser back
window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get('v');

  if (videoId) {
    openVideoPlayer(videoId);
  } else {
    showHomePage();
  }
});

// Export functions to window for components
window.openVideoPlayer = openVideoPlayer;
window.showHomePage = showHomePage;

// Initialize
document.addEventListener('DOMContentLoaded', init);
