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

// Auth elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const userMenuContainer = document.getElementById('userMenuContainer');
const userAvatarBtn = document.getElementById('userAvatarBtn');
const userDropdown = document.getElementById('userDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const closeRegisterModalBtn = document.getElementById('closeRegisterModal');
const closeForgotPasswordModalBtn = document.getElementById('closeForgotPasswordModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const backToLogin = document.getElementById('backToLogin');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

// Notification elements
const notificationBtn = document.getElementById('notificationBtn');
const notificationsDropdown = document.getElementById('notificationsDropdown');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('videoshare_theme') || 'dark';

// Pagination for infinite scroll
const VIDEOS_PER_PAGE = 12;
let currentPage = 1;
let isLoadingMore = false;
let hasMoreVideos = true;
let allFilteredVideos = [];

// Page elements
const channelPage = document.getElementById('channelPage');
const historyPage = document.getElementById('historyPage');
const likedVideosPage = document.getElementById('likedVideosPage');
const savedVideosPage = document.getElementById('savedVideosPage');
const subscriptionsPage = document.getElementById('subscriptionsPage');
const trendingPage = document.getElementById('trendingPage');
const playlistPage = document.getElementById('playlistPage');

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

// Channel Settings
const channelSettingsBtn = document.getElementById('channelSettingsBtn');
const channelSettingsModal = document.getElementById('channelSettingsModal');
const closeChannelSettingsBtn = document.getElementById('closeChannelSettingsBtn');
const cancelChannelSettingsBtn = document.getElementById('cancelChannelSettingsBtn');
const saveChannelSettingsBtn = document.getElementById('saveChannelSettingsBtn');
const settingsBannerUrl = document.getElementById('settingsBannerUrl');
const settingsAvatarUrl = document.getElementById('settingsAvatarUrl');
const settingsChannelName = document.getElementById('settingsChannelName');
const settingsChannelDescription = document.getElementById('settingsChannelDescription');
const settingsCustomUrl = document.getElementById('settingsCustomUrl');
const settingsLocation = document.getElementById('settingsLocation');
const settingsBannerPreview = document.getElementById('settingsBannerPreview');
const settingsBannerPlaceholder = document.getElementById('settingsBannerPlaceholder');
const settingsAvatarPreview = document.getElementById('settingsAvatarPreview');
const channelNameCount = document.getElementById('channelNameCount');
const channelDescCount = document.getElementById('channelDescCount');

// Video Options & Edit
const videoOptionsMenu = document.getElementById('videoOptionsMenu');
const editVideoBtn = document.getElementById('editVideoBtn');
const deleteVideoBtn = document.getElementById('deleteVideoBtn');
const changeVisibilityBtn = document.getElementById('changeVisibilityBtn');
const videoEditModal = document.getElementById('videoEditModal');
const closeVideoEditBtn = document.getElementById('closeVideoEditBtn');
const cancelVideoEditBtn = document.getElementById('cancelVideoEditBtn');
const saveVideoEditBtn = document.getElementById('saveVideoEditBtn');
const editVideoTitle = document.getElementById('editVideoTitle');
const editVideoDescription = document.getElementById('editVideoDescription');
const editVideoCategory = document.getElementById('editVideoCategory');
const editVideoTags = document.getElementById('editVideoTags');
const editVideoVisibility = document.getElementById('editVideoVisibility');
const editVideoThumbnail = document.getElementById('editVideoThumbnail');
const editTitleCount = document.getElementById('editTitleCount');
const editDescCount = document.getElementById('editDescCount');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const closeDeleteConfirmBtn = document.getElementById('closeDeleteConfirmBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Share Modal
const shareModal = document.getElementById('shareModal');
const closeShareBtn = document.getElementById('closeShareBtn');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
const shareTwitter = document.getElementById('shareTwitter');
const shareFacebook = document.getElementById('shareFacebook');
const shareReddit = document.getElementById('shareReddit');
const shareWhatsApp = document.getElementById('shareWhatsApp');

let currentEditingVideoId = null;

// State
let isPlaying = false;
let currentPlaybackSpeed = 1;
let currentVolume = 1;
let isMuted = false;
let selectedFile = null;
let currentSpeedIndex = 2; // 1x
let appCurrentVideo = null;
let appCurrentCategory = 'all';
let appCurrentDuration = 'all';
let appSearchQuery = '';
let currentRoute = 'home';

// Initialize app
async function init() {
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  // Load saved volume
  const savedVolume = localStorage.getItem('videoshare_volume');
  if (savedVolume !== null) {
    currentVolume = parseFloat(savedVolume);
    if (volumeSlider && videoElement) {
      volumeSlider.value = currentVolume * 100;
      videoElement.volume = currentVolume;
    }
  }

  await loadVideos();
  setupEventListeners();
  setupPlayerControls();
  setupKeyboardShortcuts();
  setupPlaylistEventListeners();
  setupInfiniteScroll();
  updateAuthUI();
  checkURLParams();
}

// Theme toggle functions
function updateThemeIcon() {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (currentTheme === 'light') {
    icon.className = 'ph ph-sun';
  } else {
    icon.className = 'ph ph-moon';
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('videoshare_theme', currentTheme);
  updateThemeIcon();
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const playerVisible = videoPlayerPage.classList.contains('active');

    switch (e.key.toLowerCase()) {
      case ' ':
        if (playerVisible) {
          e.preventDefault();
          togglePlay();
        }
        break;
      case 'm':
        if (playerVisible) {
          volumeBtn.click();
        }
        break;
      case 'f':
        if (playerVisible) {
          fullscreenBtn.click();
        }
        break;
      case 'arrowleft':
        if (playerVisible && videoElement.duration) {
          videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
        }
        break;
      case 'arrowright':
        if (playerVisible && videoElement.duration) {
          videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
        }
        break;
      case 'arrowup':
        if (playerVisible) {
          e.preventDefault();
          volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
          volumeSlider.dispatchEvent(new Event('input'));
        }
        break;
      case 'arrowdown':
        if (playerVisible) {
          e.preventDefault();
          volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
          volumeSlider.dispatchEvent(new Event('input'));
        }
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (playerVisible && videoElement.duration) {
          const percent = parseInt(e.key) * 10;
          videoElement.currentTime = (percent / 100) * videoElement.duration;
        }
        break;
      case '?':
        e.preventDefault();
        openShortcutsModal();
        break;
      case '/':
        e.preventDefault();
        searchInput.focus();
        break;
      case 'l':
        if (playerVisible) {
          loopBtn.click();
        }
        break;
    }
  });
}

// Shortcuts modal functions
function openShortcutsModal() {
  const shortcutsModal = document.getElementById('shortcutsModal');
  shortcutsModal.style.display = 'flex';

  document.getElementById('closeShortcutsBtn').addEventListener('click', () => {
    shortcutsModal.style.display = 'none';
  });

  shortcutsModal.addEventListener('click', (e) => {
    if (e.target === shortcutsModal) shortcutsModal.style.display = 'none';
  });
}

// Check URL params for direct video links
function checkURLParams() {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get('v');
  const channelId = params.get('channel');
  const timestamp = params.get('t');

  if (channelId) {
    openChannelPage(channelId);
  } else if (videoId) {
    // Open video and seek to timestamp if provided
    const seekTime = parseTimestamp(timestamp);
    if (seekTime > 0) {
      // Store timestamp to seek after video loads
      window.pendingTimestamp = seekTime;
    }
    openVideoPlayer(videoId);
  }
}

// Parse timestamp parameter (e.g., t=2m30s or t=150)
function parseTimestamp(t) {
  if (!t) return 0;

  // If it's a plain number, return it
  if (!isNaN(t)) return parseInt(t);

  // Parse format like 2m30s or 1h30m
  let seconds = 0;
  const hourMatch = t.match(/(\d+)h/);
  const minMatch = t.match(/(\d+)m/);
  const secMatch = t.match(/(\d+)s/);

  if (hourMatch) seconds += parseInt(hourMatch[1]) * 3600;
  if (minMatch) seconds += parseInt(minMatch[1]) * 60;
  if (secMatch) seconds += parseInt(secMatch[1]);

  return seconds;
}

// Update UI based on auth state
function updateAuthUI() {
  const user = auth.getCurrentUser();

  if (user) {
    // Show user menu
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    userMenuContainer.style.display = 'block';

    // Update user info in dropdown
    const userAvatarImg = document.getElementById('userAvatarImg');
    const dropdownAvatar = document.getElementById('dropdownAvatar');
    const dropdownUsername = document.getElementById('dropdownUsername');
    const dropdownEmail = document.getElementById('dropdownEmail');

    userAvatarImg.src = user.avatar || auth.DEFAULT_AVATAR;
    dropdownAvatar.src = user.avatar || auth.DEFAULT_AVATAR;
    dropdownUsername.textContent = user.username;
    dropdownEmail.textContent = user.email;

    // Update notifications badge
    updateNotificationBadge();
  } else {
    // Show auth buttons
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    userMenuContainer.style.display = 'none';
  }
}

// Update notification badge
function updateNotificationBadge() {
  const unreadCount = auth.getUnreadNotificationsCount();
  const notificationDot = notificationBtn.querySelector('.notification-dot');

  if (unreadCount > 0) {
    notificationDot.style.display = 'block';
  } else {
    notificationDot.style.display = 'none';
  }
}

// Setup event listeners
function setupEventListeners() {
  // Sidebar toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Search
  const handleSearch = utils.debounce(() => {
    const query = searchInput.value.trim();

    // Show suggestions if there's input
    if (query.length > 0) {
      showSearchSuggestions(query);
    }

    appSearchQuery = query;
    loadVideos();

    if (query.length === 0) {
      showSearchDropdown();
    } else {
      hideSearchDropdown();
    }
  }, 300);

  function showSearchSuggestions(query) {
    const suggestionsSection = document.getElementById('searchSuggestionsSection');
    const suggestionsList = document.getElementById('searchSuggestionsList');
    const historySection = document.getElementById('searchHistorySection');

    if (!suggestionsSection || !suggestionsList) return;

    // Find matching videos
    const matches = videos.filter(v =>
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.channel.name.toLowerCase().includes(query.toLowerCase()) ||
      (v.tags && v.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
    ).slice(0, 5);

    if (matches.length === 0) {
      suggestionsSection.style.display = 'none';
      historySection.style.display = 'block';
      return;
    }

    suggestionsList.innerHTML = matches.map(video => `
      <div class="search-suggestion-item" data-video-id="${video.id}">
        <i class="ph ph-magnifying-glass"></i>
        <div class="suggestion-content">
          <span class="suggestion-title">${video.title}</span>
          <span class="suggestion-channel">${video.channel.name}</span>
        </div>
      </div>
    `).join('');

    // Add click handlers for suggestions
    suggestionsList.querySelectorAll('.search-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const videoId = item.dataset.videoId;
        openVideoPlayer(videoId);
        hideSearchDropdown();
      });
    });

    suggestionsSection.style.display = 'block';
    historySection.style.display = 'none';
  }

  searchInput.addEventListener('input', handleSearch);
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      auth.addToSearchHistory(query);
    }
    appSearchQuery = query;
    loadVideos();
    hideSearchDropdown();
  });

  // Search dropdown
  const searchDropdown = document.getElementById('searchDropdown');
  const searchHistoryList = document.getElementById('searchHistoryList');
  const clearSearchHistoryBtn = document.getElementById('clearSearchHistory');

  function showSearchDropdown() {
    const history = auth.getSearchHistory();
    if (history.length === 0) {
      searchDropdown.style.display = 'none';
      return;
    }

    searchHistoryList.innerHTML = history.map(query => `
      <div class="search-history-item" data-query="${query}">
        <i class="ph ph-clock-counter-clockwise"></i>
        <span>${query}</span>
        <i class="ph ph-x remove-search"></i>
      </div>
    `).join('');

    // Add click handlers
    searchHistoryList.querySelectorAll('.search-history-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-search')) {
          e.stopPropagation();
          const query = item.dataset.query;
          const history = auth.getSearchHistory().filter(q => q !== query);
          localStorage.setItem('videoshare_search_history', JSON.stringify(history));
          showSearchDropdown();
          return;
        }
        searchInput.value = item.dataset.query;
        appSearchQuery = item.dataset.query;
        loadVideos();
        hideSearchDropdown();
      });
    });

    searchDropdown.style.display = 'block';
  }

  function hideSearchDropdown() {
    searchDropdown.style.display = 'none';
  }

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() === '') {
      showSearchDropdown();
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => {
      hideSearchDropdown();
    }, 200);
  });

  clearSearchHistoryBtn?.addEventListener('click', () => {
    auth.clearSearchHistory();
    hideSearchDropdown();
  });

  // Categories
  categoriesBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;

    categoriesBar.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    appCurrentCategory = chip.dataset.category;
    loadVideos();
  });

  // Duration filter
  const durationFilterBtn = document.getElementById('durationFilterBtn');
  const durationFilterDropdown = document.getElementById('durationFilterDropdown');

  if (durationFilterBtn) {
    durationFilterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (durationFilterDropdown.style.display === 'none') {
        durationFilterDropdown.style.display = 'block';
      } else {
        durationFilterDropdown.style.display = 'none';
      }
    });
  }

  if (durationFilterDropdown) {
    durationFilterDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.filter-option');
      if (!option) return;

      durationFilterDropdown.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      appCurrentDuration = option.dataset.duration;
      durationFilterDropdown.style.display = 'none';

      // Update button text
      const span = durationFilterBtn.querySelector('span');
      if (span) {
        span.textContent = option.textContent;
      }

      loadVideos();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (durationFilterDropdown && !durationFilterBtn.contains(e.target) && !durationFilterDropdown.contains(e.target)) {
      durationFilterDropdown.style.display = 'none';
    }
  });

  // Upload modal
  uploadBtn.addEventListener('click', () => {
    const user = auth.getCurrentUser();
    if (!user) {
      openLoginModal();
      utils.showToast('Please sign in to upload videos', 'error');
      return;
    }
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

  // Thumbnail URL preview
  const thumbnailUrlInput = document.getElementById('thumbnailUrlInput');
  const thumbnailPreviewImg = document.getElementById('thumbnailPreviewImg');
  const thumbnailPlaceholder = document.getElementById('thumbnailPlaceholder');

  if (thumbnailUrlInput) {
    thumbnailUrlInput.addEventListener('input', () => {
      if (thumbnailUrlInput.value) {
        thumbnailPreviewImg.src = thumbnailUrlInput.value;
        thumbnailPreviewImg.style.display = 'block';
        thumbnailPlaceholder.style.display = 'none';
      } else {
        thumbnailPreviewImg.style.display = 'none';
        thumbnailPlaceholder.style.display = 'flex';
      }
    });
  }

  // Auth event listeners
  setupAuthEventListeners();

  // Navigation event listeners
  setupNavigationEventListeners();

  // Notification event listeners
  setupNotificationEventListeners();

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Channel settings event listeners
  if (channelSettingsBtn) {
    channelSettingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openChannelSettings();
    });
  }

  if (closeChannelSettingsBtn) {
    closeChannelSettingsBtn.addEventListener('click', closeChannelSettings);
  }

  if (cancelChannelSettingsBtn) {
    cancelChannelSettingsBtn.addEventListener('click', closeChannelSettings);
  }

  if (channelSettingsModal) {
    channelSettingsModal.addEventListener('click', (e) => {
      if (e.target === channelSettingsModal) closeChannelSettings();
    });
  }

  if (saveChannelSettingsBtn) {
    saveChannelSettingsBtn.addEventListener('click', saveChannelSettings);
  }

  // Character count updates
  if (settingsChannelName) {
    settingsChannelName.addEventListener('input', () => {
      channelNameCount.textContent = settingsChannelName.value.length;
    });
  }

  if (settingsChannelDescription) {
    settingsChannelDescription.addEventListener('input', () => {
      channelDescCount.textContent = settingsChannelDescription.value.length;
    });
  }

  // Banner URL preview
  if (settingsBannerUrl) {
    settingsBannerUrl.addEventListener('input', () => {
      if (settingsBannerUrl.value) {
        settingsBannerPreview.src = settingsBannerUrl.value;
        settingsBannerPreview.style.display = 'block';
        settingsBannerPlaceholder.style.display = 'none';
      } else {
        settingsBannerPreview.style.display = 'none';
        settingsBannerPlaceholder.style.display = 'flex';
      }
    });
  }

  // Avatar URL preview
  if (settingsAvatarUrl) {
    settingsAvatarUrl.addEventListener('input', () => {
      if (settingsAvatarUrl.value) {
        settingsAvatarPreview.src = settingsAvatarUrl.value;
      }
    });
  }

  // Video options menu event listeners
  if (editVideoBtn) {
    editVideoBtn.addEventListener('click', () => {
      const videoId = videoOptionsMenu.dataset.videoId;
      openVideoEditModal(videoId);
    });
  }

  if (deleteVideoBtn) {
    deleteVideoBtn.addEventListener('click', () => {
      const videoId = videoOptionsMenu.dataset.videoId;
      hideVideoOptionsMenu();
      deleteConfirmModal.style.display = 'flex';
      deleteConfirmModal.dataset.videoId = videoId;
    });
  }

  if (changeVisibilityBtn) {
    changeVisibilityBtn.addEventListener('click', () => {
      const videoId = videoOptionsMenu.dataset.videoId;
      const video = videos.find(v => v.id === videoId);
      if (video) {
        // Cycle through visibility: public -> unlisted -> private -> public
        const visibilityOrder = ['public', 'unlisted', 'private'];
        const currentIndex = visibilityOrder.indexOf(video.visibility || 'public');
        const nextIndex = (currentIndex + 1) % visibilityOrder.length;
        video.visibility = visibilityOrder[nextIndex];
        localStorage.setItem('videoshare_videos', JSON.stringify(videos));
        hideVideoOptionsMenu();
        showToast(`Visibility changed to ${video.visibility}`, 'success');
      }
    });
  }

  // Report video button
  const reportVideoBtn = document.getElementById('reportVideoBtn');
  if (reportVideoBtn) {
    reportVideoBtn.addEventListener('click', () => {
      hideVideoOptionsMenu();
      const reported = JSON.parse(localStorage.getItem('videoshare_reports') || '[]');
      reported.push({
        videoId: videoOptionsMenu.dataset.videoId,
        reportedAt: new Date().toISOString()
      });
      localStorage.setItem('videoshare_reports', JSON.stringify(reported));
      showToast('Video has been reported. Thank you for your feedback!');
    });
  }

  // Hide menu on outside click
  document.addEventListener('click', (e) => {
    if (!videoOptionsMenu.contains(e.target) && !e.target.closest('.video-menu')) {
      hideVideoOptionsMenu();
    }
  });

  // Video edit modal event listeners
  if (closeVideoEditBtn) {
    closeVideoEditBtn.addEventListener('click', closeVideoEditModal);
  }

  if (cancelVideoEditBtn) {
    cancelVideoEditBtn.addEventListener('click', closeVideoEditModal);
  }

  if (videoEditModal) {
    videoEditModal.addEventListener('click', (e) => {
      if (e.target === videoEditModal) closeVideoEditModal();
    });
  }

  if (saveVideoEditBtn) {
    saveVideoEditBtn.addEventListener('click', saveVideoEdits);
  }

  // Character count for edit form
  if (editVideoTitle) {
    editVideoTitle.addEventListener('input', () => {
      editTitleCount.textContent = editVideoTitle.value.length;
    });
  }

  if (editVideoDescription) {
    editVideoDescription.addEventListener('input', () => {
      editDescCount.textContent = editVideoDescription.value.length;
    });
  }

  // Delete confirmation modal
  if (closeDeleteConfirmBtn) {
    closeDeleteConfirmBtn.addEventListener('click', () => {
      deleteConfirmModal.style.display = 'none';
    });
  }

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', () => {
      deleteConfirmModal.style.display = 'none';
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      const videoId = deleteConfirmModal.dataset.videoId;
      deleteVideo(videoId);
    });
  }

  if (deleteConfirmModal) {
    deleteConfirmModal.addEventListener('click', (e) => {
      if (e.target === deleteConfirmModal) deleteConfirmModal.style.display = 'none';
    });
  }

  // Share modal handlers
  if (closeShareBtn) {
    closeShareBtn.addEventListener('click', () => {
      shareModal.style.display = 'none';
    });
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) shareModal.style.display = 'none';
    });
  }

  if (copyShareLinkBtn) {
    copyShareLinkBtn.addEventListener('click', () => {
      shareLinkInput.select();
      document.execCommand('copy');
      utils.showToast('Link copied to clipboard!', 'success');
    });
  }

  // Comment submission
  const commentInput = document.querySelector('.comment-input');
  const commentSubmit = document.querySelector('.comment-submit');
  const commentCancel = document.querySelector('.comment-cancel');
  const commentInputWrapper = document.querySelector('.comment-input-wrapper');

  if (commentInput) {
    commentInput.addEventListener('focus', () => {
      const user = auth.getCurrentUser();
      if (!user) {
        openLoginModal();
        utils.showToast('Please sign in to comment');
        commentInput.blur();
        return;
      }
      commentInputWrapper.classList.add('expanded');
    });

    commentInput.addEventListener('input', () => {
      const text = commentInput.value.trim();
      commentSubmit.disabled = text.length === 0;
    });

    commentSubmit?.addEventListener('click', () => {
      const user = auth.getCurrentUser();
      if (!user) {
        openLoginModal();
        return;
      }

      const text = commentInput.value.trim();
      if (!text) return;

      // Add new comment
      const newComment = {
        id: 'cm_' + Math.random().toString(36).substr(2, 9),
        author: user.username,
        avatar: user.avatar,
        text: text,
        likes: 0,
        uploadedAt: new Date(),
        replies: []
      };

      // Add to mock comments
      window.mockData.comments.unshift(newComment);
      components.renderComments(window.mockData.comments);
      setupCommentEventListeners();

      // Reset input
      commentInput.value = '';
      commentSubmit.disabled = true;
      commentInputWrapper.classList.remove('expanded');

      utils.showToast('Comment posted!', 'success');
    });

    commentCancel?.addEventListener('click', () => {
      commentInput.value = '';
      commentSubmit.disabled = true;
      commentInputWrapper.classList.remove('expanded');
    });
  }

  // Comment sort functionality
  const commentSortBtn = document.getElementById('commentSortBtn');
  const commentSortDropdown = document.getElementById('commentSortDropdown');
  const sortOptions = document.querySelectorAll('.sort-option');
  const currentSortOption = document.getElementById('currentSortOption');
  let currentCommentSort = 'top';

  if (commentSortBtn) {
    commentSortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      commentSortDropdown.style.display = commentSortDropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
      commentSortDropdown.style.display = 'none';
    });

    sortOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCommentSort = option.dataset.sort;

        // Update UI
        sortOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        currentSortOption.textContent = option.textContent;
        commentSortDropdown.style.display = 'none';

        // Re-render comments with sort
        if (window.mockData && window.mockData.comments) {
          const sorted = [...window.mockData.comments];
          if (currentCommentSort === 'top') {
            sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
          } else {
            sorted.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
          }
          components.renderComments(sorted);
          setupCommentEventListeners();
        }
      });
    });
  }

  // Setup comment reply handlers
  setupCommentEventListeners();

  // Channel tabs
  const channelTabs = document.querySelectorAll('.channel-tab');
  channelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const channelId = document.getElementById('channelPageAvatar')?.closest('.channel-page')?.querySelector('.channel-tabs')?.dataset?.channelId;
      if (!tab.dataset.tab) return;

      // Update active tab
      channelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Load tab content
      loadChannelTab(tab.dataset.tab, channelId);
    });
  });
}

// Load channel tab content
function loadChannelTab(tabName, channelId) {
  const content = document.getElementById('channelContent');
  const user = auth.getCurrentUser();

  // Get channel info
  let channel = null;
  if (user && user.channel && user.channel.id === channelId) {
    channel = user.channel;
    channel.avatar = user.avatar;
    channel.isOwner = true;
  } else {
    const video = videos.find(v => v.channel.id === channelId);
    if (video) {
      channel = { ...video.channel, isOwner: false };
    }
  }

  if (!channel) return;

  switch (tabName) {
    case 'videos':
      const channelVideos = videos.filter(v => v.channel.id === channelId);
      if (channelVideos.length === 0) {
        content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-video-camera-slash"></i><h3>No videos yet</h3><p>This channel has not uploaded any videos</p></div>';
      } else {
        content.innerHTML = `<div class="video-grid">${channelVideos.map(components.renderVideoCard).join('')}</div>`;
        content.querySelectorAll('.video-card').forEach(card => {
          card.addEventListener('click', () => {
            openVideoPlayer(card.dataset.videoId);
          });
        });
      }
      break;

    case 'playlists':
      const userPlaylists = auth.getPlaylists();
      const channelPlaylists = userPlaylists.filter(p => p.channelId === channelId);
      if (channelPlaylists.length === 0) {
        content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-list-chevron"></i><h3>No playlists yet</h3><p>This channel has not created any playlists</p></div>';
      } else {
        content.innerHTML = `<div class="playlists-grid">${channelPlaylists.map(playlist => `
          <div class="playlist-card" data-playlist-id="${playlist.id}">
            <div class="playlist-thumbnail">
              <i class="ph-fill ph-list-chevron"></i>
            </div>
            <div class="playlist-info">
              <h3>${playlist.name}</h3>
              <p>${playlist.videos.length} videos</p>
            </div>
          </div>
        `).join('')}</div>`;
      }
      break;

    case 'about':
      content.innerHTML = `
        <div class="channel-about">
          <h3>Details</h3>
          <p><strong>Channel:</strong> ${channel.name}</p>
          <p><strong>Subscribers:</strong> ${utils.formatSubscribers(channel.subscribers || 0)}</p>
          <p><strong>Total views:</strong> ${utils.formatNumber(channel.totalViews || 0)}</p>
          <p><strong>Joined:</strong> ${channel.joinedDate ? new Date(channel.joinedDate).toLocaleDateString() : 'Unknown'}</p>
          ${channel.description ? `<p><strong>Description:</strong></p><p>${channel.description}</p>` : ''}
        </div>
      `;
      break;

    case 'analytics':
      content.innerHTML = `
        <div class="channel-analytics">
          <h3>Channel Analytics</h3>
          <div class="analytics-cards">
            <div class="analytics-card">
              <span class="analytics-value">${utils.formatNumber(channel.totalViews || 0)}</span>
              <span class="analytics-label">Total views</span>
            </div>
            <div class="analytics-card">
              <span class="analytics-value">${utils.formatSubscribers(channel.subscribers || 0)}</span>
              <span class="analytics-label">Subscribers</span>
            </div>
            <div class="analytics-card">
              <span class="analytics-value">${videos.filter(v => v.channel.id === channelId).length}</span>
              <span class="analytics-label">Total videos</span>
            </div>
          </div>
        </div>
      `;
      break;

    case 'community':
      content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-chat-teardrop-text"></i><h3>No community posts</h3><p>This channel has not posted any updates</p></div>';
      break;
  }
}

// Setup comment event listeners
function setupCommentEventListeners() {
  document.querySelectorAll('.comment-reply').forEach(btn => {
    btn.onclick = null; // Remove previous handlers
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const user = auth.getCurrentUser();
      if (!user) {
        openLoginModal();
        utils.showToast('Please sign in to reply');
        return;
      }

      const comment = btn.closest('.comment');
      const commentId = comment.dataset.commentId;

      // Close any other open reply forms
      document.querySelectorAll('.comment-reply-form').forEach(form => form.remove());

      // Create reply form
      const replyForm = document.createElement('div');
      replyForm.className = 'comment-reply-form';
      replyForm.innerHTML = `
        <img src="${user.avatar}" alt="${user.username}" class="comment-avatar" style="width: 32px; height: 32px;">
        <input type="text" class="comment-input" placeholder="Add a reply...">
        <button class="reply-cancel">Cancel</button>
        <button class="reply-submit" disabled>Reply</button>
      `;

      comment.querySelector('.comment-content').appendChild(replyForm);

      const replyInput = replyForm.querySelector('.comment-input');
      const replySubmit = replyForm.querySelector('.reply-submit');
      const replyCancel = replyForm.querySelector('.reply-cancel');

      replyInput.addEventListener('input', () => {
        replySubmit.disabled = replyInput.value.trim().length === 0;
      });

      replySubmit.addEventListener('click', () => {
        const text = replyInput.value.trim();
        if (!text) return;

        const newReply = {
          id: 'reply_' + Math.random().toString(36).substr(2, 9),
          author: user.username,
          avatar: user.avatar,
          text: text,
          likes: 0,
          uploadedAt: new Date()
        };

        // Find comment and add reply
        const targetComment = window.mockData.comments.find(c => c.id === commentId);
        if (targetComment) {
          if (!targetComment.replies) targetComment.replies = [];
          targetComment.replies.push(newReply);
          components.renderComments(window.mockData.comments);
          setupCommentEventListeners();
          utils.showToast('Reply posted!', 'success');
        }
      });

      replyCancel.addEventListener('click', () => {
        replyForm.remove();
      });

      replyInput.focus();
    });
  });

  // Comment like buttons
  document.querySelectorAll('.comment-like').forEach(btn => {
    btn.onclick = null;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const user = auth.getCurrentUser();
      if (!user) {
        openLoginModal();
        utils.showToast('Please sign in to like comments');
        return;
      }

      const commentId = btn.dataset.commentId;

      // Initialize likedComments if not exists
      if (!user.likedComments) {
        user.likedComments = [];
      }

      const isLiked = user.likedComments.includes(commentId);

      // Toggle like
      if (isLiked) {
        user.likedComments = user.likedComments.filter(id => id !== commentId);
      } else {
        user.likedComments.push(commentId);
      }

      // Save to localStorage
      const users = auth.getUsersFromStorage();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].likedComments = user.likedComments;
        localStorage.setItem('videoshare_users', JSON.stringify(users));
      }
      auth.saveUser(user, true);

      // Update UI
      btn.classList.toggle('liked', !isLiked);
      const countSpan = btn.querySelector('.like-count');
      let count = parseInt(countSpan?.textContent) || 0;

      // Find the comment in mock data and update its likes
      const comment = window.mockData.comments.find(c => c.id === commentId);
      if (comment) {
        comment.likes = isLiked ? Math.max(0, (comment.likes || 1) - 1) : (comment.likes || 0) + 1;
        if (countSpan) {
          countSpan.textContent = comment.likes;
        }
      } else {
        // Check replies
        window.mockData.comments.forEach(c => {
          if (c.replies) {
            const reply = c.replies.find(r => r.id === commentId);
            if (reply) {
              reply.likes = isLiked ? Math.max(0, (reply.likes || 1) - 1) : (reply.likes || 0) + 1;
              if (countSpan) {
                countSpan.textContent = reply.likes;
              }
            }
          }
        });
      }

      utils.showToast(!isLiked ? 'Comment liked' : 'Like removed');
    });
  });
}

// Setup auth event listeners
function setupAuthEventListeners() {
  // Open modals
  loginBtn.addEventListener('click', openLoginModal);
  registerBtn.addEventListener('click', openRegisterModal);
  forgotPasswordBtn.addEventListener('click', () => {
    closeLoginModal();
    openForgotPasswordModal();
  });

  // Close modals
  closeLoginModalBtn.addEventListener('click', closeLoginModal);
  closeRegisterModalBtn.addEventListener('click', closeRegisterModal);
  closeForgotPasswordModalBtn.addEventListener('click', closeForgotPasswordModal);

  // Switch between modals
  switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    closeLoginModal();
    openRegisterModal();
  });

  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeRegisterModal();
    openLoginModal();
  });

  backToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeForgotPasswordModal();
    openLoginModal();
  });

  // Close modals on overlay click
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) closeLoginModal();
  });

  registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) closeRegisterModal();
  });

  forgotPasswordModal.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) closeForgotPasswordModal();
  });

  // Form submissions
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  forgotPasswordForm.addEventListener('submit', handleForgotPassword);

  // User dropdown
  userAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('show');
    notificationsDropdown.classList.remove('show');
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    userDropdown.classList.remove('show');
    notificationsDropdown.classList.remove('show');
  });

  // Logout
  logoutBtn.addEventListener('click', handleLogout);

  // User dropdown navigation
  userDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('[data-route]');
    if (item) {
      const route = item.dataset.route;
      handleNavigation(route);
      userDropdown.classList.remove('show');
    }
  });

  // Listen for logout event
  window.addEventListener('userLoggedOut', () => {
    updateAuthUI();
    showHomePage();
    utils.showToast('You have been signed out');
  });

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('ph-eye', 'ph-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('ph-eye-slash', 'ph-eye');
      }
    });
  });
}

// Open login modal
function openLoginModal() {
  loginModal.style.display = 'flex';
  document.getElementById('loginEmail').focus();
}

// Close login modal
function closeLoginModal() {
  loginModal.style.display = 'none';
  loginForm.reset();
}

// Open register modal
function openRegisterModal() {
  registerModal.style.display = 'flex';
  document.getElementById('registerUsername').focus();
}

// Close register modal
function closeRegisterModal() {
  registerModal.style.display = 'none';
  registerForm.reset();
}

// Open forgot password modal
function openForgotPasswordModal() {
  forgotPasswordModal.style.display = 'flex';
  document.getElementById('forgotEmail').focus();
}

// Close forgot password modal
function closeForgotPasswordModal() {
  forgotPasswordModal.style.display = 'none';
  forgotPasswordForm.reset();
}

// Handle login
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  const result = auth.login(email, password, rememberMe);

  if (result.success) {
    closeLoginModal();
    updateAuthUI();
    utils.showToast('Welcome back, ' + result.user.username + '!', 'success');
  } else {
    utils.showToast(result.error, 'error');
  }
}

// Handle register
function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (password !== confirmPassword) {
    utils.showToast('Passwords do not match', 'error');
    return;
  }

  const result = auth.register(email, username, password);

  if (result.success) {
    closeRegisterModal();
    updateAuthUI();
    utils.showToast('Account created! Welcome to VideoShare!', 'success');
  } else {
    utils.showToast(result.error, 'error');
  }
}

// Handle forgot password
function handleForgotPassword(e) {
  e.preventDefault();

  const email = document.getElementById('forgotEmail').value.trim();
  const result = auth.forgotPassword(email);

  closeForgotPasswordModal();
  utils.showToast(result.message);
}

// Handle logout
function handleLogout() {
  auth.logout();
}

// Playlist modals
const playlistModal = document.getElementById('playlistModal');
const closePlaylistModal = document.getElementById('closePlaylistModal');
const playlistForm = document.getElementById('playlistForm');
const saveToPlaylistModal = document.getElementById('saveToPlaylistModal');
const closeSaveToPlaylistModal = document.getElementById('closeSaveToPlaylistModal');
const playlistList = document.getElementById('playlistList');
const createNewPlaylistBtn = document.getElementById('createNewPlaylistBtn');
let currentVideoToSave = null;

function openPlaylistModal() {
  playlistModal.style.display = 'flex';
  document.getElementById('playlistName').focus();
}

function closePlaylistModalFn() {
  playlistModal.style.display = 'none';
  playlistForm.reset();
}

function openSaveToPlaylistModal(videoId) {
  const user = auth.getCurrentUser();
  if (!user) {
    openLoginModal();
    utils.showToast('Please sign in to save videos');
    return;
  }

  currentVideoToSave = videoId;
  renderPlaylistList();
  saveToPlaylistModal.style.display = 'flex';
}

function closeSaveToPlaylistModalFn() {
  saveToPlaylistModal.style.display = 'none';
  currentVideoToSave = null;
}

function renderPlaylistList() {
  const user = auth.getCurrentUser();
  const playlists = auth.getPlaylists() || [];
  const watchLater = user?.savedVideos?.filter(s => s.playlist === 'watch-later') || [];

  let html = `
    <div class="playlist-item ${watchLater.length > 0 && watchLater.some(s => s.videoId === currentVideoToSave) ? 'saved' : ''}" data-playlist="watch-later">
      <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=160&h=90&fit=crop" alt="Watch Later">
      <div class="playlist-item-info">
        <div class="playlist-item-name">Watch Later</div>
        <div class="playlist-item-count">${watchLater.length} videos</div>
      </div>
      <i class="ph-fill ph-check check-icon"></i>
    </div>
  `;

  playlists.forEach(playlist => {
    const isInPlaylist = playlist.videos.includes(currentVideoToSave);
    html += `
      <div class="playlist-item ${isInPlaylist ? 'saved' : ''}" data-playlist="${playlist.id}">
        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=160&h=90&fit=crop" alt="${playlist.name}">
        <div class="playlist-item-info">
          <div class="playlist-item-name">${playlist.name}</div>
          <div class="playlist-item-count">${playlist.videos.length} videos</div>
        </div>
        <i class="ph-fill ph-check check-icon"></i>
      </div>
    `;
  });

  playlistList.innerHTML = html;

  // Add click handlers
  playlistList.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', () => {
      const playlistId = item.dataset.playlist;
      if (playlistId === 'watch-later') {
        if (item.classList.contains('saved')) {
          auth.unsaveVideo(currentVideoToSave);
        } else {
          auth.saveVideo(currentVideoToSave);
        }
      } else {
        if (item.classList.contains('saved')) {
          auth.removeFromPlaylist(playlistId, currentVideoToSave);
        } else {
          auth.addToPlaylist(playlistId, currentVideoToSave);
        }
      }
      renderPlaylistList();
      utils.showToast(item.classList.contains('saved') ? 'Removed from playlist' : 'Added to playlist');
    });
  });
}

// Setup playlist event listeners
function setupPlaylistEventListeners() {
  closePlaylistModal?.addEventListener('click', closePlaylistModalFn);
  closeSaveToPlaylistModal?.addEventListener('click', closeSaveToPlaylistModalFn);

  playlistModal?.addEventListener('click', (e) => {
    if (e.target === playlistModal) closePlaylistModalFn();
  });

  saveToPlaylistModal?.addEventListener('click', (e) => {
    if (e.target === saveToPlaylistModal) closeSaveToPlaylistModalFn();
  });

  playlistForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('playlistName').value.trim();
    const description = document.getElementById('playlistDescription').value.trim();
    const visibility = document.getElementById('playlistVisibility').value;

    const result = auth.createPlaylist(name, description, visibility);
    if (result.success) {
      closePlaylistModalFn();
      utils.showToast('Playlist created!', 'success');
    } else {
      utils.showToast(result.error, 'error');
    }
  });

  createNewPlaylistBtn?.addEventListener('click', () => {
    closeSaveToPlaylistModalFn();
    openPlaylistModal();
  });
}

// Setup navigation event listeners
function setupNavigationEventListeners() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.dataset.route;
      handleNavigation(route);

      // Update active state
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Logo click goes home
  document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    handleNavigation('home');
  });

  // Channel tabs
  document.querySelectorAll('.channel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      document.querySelectorAll('.channel-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Get current channel from channel page
      const currentUser = auth.getCurrentUser();
      const channelName = document.getElementById('channelPageName');
      const channelHandle = document.getElementById('channelPageHandle');
      const content = document.getElementById('channelContent');

      if (!channelName) return;

      const channelId = document.getElementById('channelSubscribeBtn')?.dataset?.channelId;

      // Get channel's videos
      const channelVideos = videos.filter(v => v.channel.id === channelId);

      switch (tabName) {
        case 'videos':
          if (channelVideos.length === 0) {
            content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-video-camera-slash"></i><h3>No videos yet</h3><p>This channel has not uploaded any videos</p></div>';
          } else {
            content.innerHTML = `<div class="video-grid">${channelVideos.map(renderVideoCard).join('')}</div>`;
            content.querySelectorAll('.video-card').forEach(card => {
              card.addEventListener('click', () => openVideoPlayer(card.dataset.videoId));
            });
          }
          break;

        case 'playlists':
          const playlists = currentUser?.playlists || [];
          if (playlists.length === 0) {
            content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-list-dashes"></i><h3>No playlists</h3><p>This channel has not created any playlists</p></div>';
          } else {
            content.innerHTML = `
              <div class="channel-playlists-grid">
                ${playlists.map(p => `
                  <div class="playlist-card" data-playlist-id="${p.id}">
                    <div class="playlist-thumbnail">
                      <i class="ph-fill ph-list-dashes"></i>
                    </div>
                    <div class="playlist-info">
                      <h3>${p.name}</h3>
                      <p>${p.videos.length} videos</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            `;
          }
          break;

        case 'community':
          content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-users-three"></i><h3>No community posts</h3><p>Community posts will appear here</p></div>';
          break;

        case 'analytics':
          if (currentUser && currentUser.channel && currentUser.channel.id === channelId) {
            // Calculate analytics
            const totalViews = channelVideos.reduce((sum, v) => sum + (v.views || 0), 0);
            const totalLikes = channelVideos.reduce((sum, v) => sum + (v.likes || 0), 0);
            const totalComments = channelVideos.reduce((sum, v) => sum + (v.commentsCount || 0), 0);
            const avgViews = channelVideos.length > 0 ? Math.round(totalViews / channelVideos.length) : 0;

            content.innerHTML = `
              <div class="analytics-dashboard">
                <div class="analytics-overview">
                  <div class="analytics-card">
                    <i class="ph-fill ph-eye"></i>
                    <div class="analytics-value">${utils.formatNumber(totalViews)}</div>
                    <div class="analytics-label">Total Views</div>
                  </div>
                  <div class="analytics-card">
                    <i class="ph-fill ph-users"></i>
                    <div class="analytics-value">${utils.formatSubscribers(currentUser.channel.subscribers || 0)}</div>
                    <div class="analytics-label">Subscribers</div>
                  </div>
                  <div class="analytics-card">
                    <i class="ph-fill ph-video-camera"></i>
                    <div class="analytics-value">${channelVideos.length}</div>
                    <div class="analytics-label">Total Videos</div>
                  </div>
                  <div class="analytics-card">
                    <i class="ph-fill ph-heart"></i>
                    <div class="analytics-value">${utils.formatNumber(totalLikes)}</div>
                    <div class="analytics-label">Total Likes</div>
                  </div>
                </div>
                <div class="analytics-details">
                  <div class="analytics-detail-card">
                    <h3>Average Views per Video</h3>
                    <p>${utils.formatNumber(avgViews)}</p>
                  </div>
                  <div class="analytics-detail-card">
                    <h3>Total Comments</h3>
                    <p>${utils.formatNumber(totalComments)}</p>
                  </div>
                  <div class="analytics-detail-card">
                    <h3>Channel Joined</h3>
                    <p>${new Date(currentUser.channel.joinedDate || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <div class="analytics-detail-card">
                    <h3>Total Watch Time</h3>
                    <p>~${Math.round(totalViews * 5 / 60)} hours</p>
                  </div>
                </div>
              </div>
            `;
          } else {
            content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-chart-bar"></i><h3>Analytics not available</h3><p>Only the channel owner can view analytics</p></div>';
          }
          break;

        case 'about':
          content.innerHTML = `
            <div class="channel-about">
              <div class="about-section">
                <h3>Description</h3>
                <p>${channel.description || 'No description provided.'}</p>
              </div>
              <div class="about-section">
                <h3>Details</h3>
                <p><strong>Location:</strong> ${channel.location || 'Not specified'}</p>
                <p><strong>Joined:</strong> ${new Date(channel.joinedDate || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          `;
          break;
      }
    });
  });

  // Saved videos tabs
  document.querySelectorAll('.saved-header .tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.saved-header .tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Filter saved videos (simplified)
    });
  });

  // Clear history
  document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
    const user = auth.getCurrentUser();
    if (user) {
      user.watchHistory = [];
      auth.updateProfile({ watchHistory: [] });
      renderHistoryPage();
      utils.showToast('Watch history cleared');
    }
  });
}

// Handle navigation
function handleNavigation(route) {
  // Hide all pages
  mainContent.style.display = 'none';
  videoPlayerPage.classList.remove('active');
  channelPage.style.display = 'none';
  historyPage.style.display = 'none';
  likedVideosPage.style.display = 'none';
  savedVideosPage.style.display = 'none';
  subscriptionsPage.style.display = 'none';
  trendingPage.style.display = 'none';

  // Show selected page
  switch (route) {
    case 'home':
      mainContent.style.display = 'block';
      loadVideos();
      break;
    case 'explore':
      mainContent.style.display = 'block';
      appCurrentCategory = 'all';
      loadVideos();
      break;
    case 'trending':
      renderTrendingPage();
      break;
    case 'subscriptions':
      renderSubscriptionsPage();
      break;
    case 'library':
      renderSavedPage();
      break;
    case 'history':
      renderHistoryPage();
      break;
    case 'liked':
      renderLikedPage();
      break;
    case 'my-channel':
      const user = auth.getCurrentUser();
      if (user) {
        openChannelPage(user.channel.id);
      } else {
        openLoginModal();
        utils.showToast('Please sign in to view your channel');
      }
      break;
    case 'channel':
      // Channel will be opened via openChannelPage
      break;
    default:
      mainContent.style.display = 'block';
  }

  currentRoute = route;
  window.history.pushState({}, '', window.location.pathname);
}

// Render trending page
function renderTrendingPage() {
  const grid = document.getElementById('trendingGrid');
  const container = document.getElementById('trendingPage');

  // Sort videos by views (most viewed = trending)
  const trendingVideos = [...videos].sort((a, b) => b.views - a.views);

  // Render top 20 trending videos
  grid.innerHTML = trendingVideos.slice(0, 20).map((video, index) => `
    <article class="video-card trending-card" data-video-id="${video.id}">
      <div class="trending-rank">#${index + 1}</div>
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${video.duration}</span>
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
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.video-menu')) {
        const videoId = card.dataset.videoId;
        openVideoPlayer(videoId);
      }
    });
  });

  container.style.display = 'block';
}

function renderSubscriptionsPage() {
  const user = auth.getCurrentUser();
  const grid = document.getElementById('subscriptionsGrid');
  const emptyState = document.getElementById('subscriptionsEmptyState');

  if (!user || !user.subscribedChannels || user.subscribedChannels.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    subscriptionsPage.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = user.subscribedChannels.map(channel => `
    <div class="subscription-card" data-channel-id="${channel.id}">
      <img src="${channel.avatar}" alt="${channel.name}">
      <h3>${channel.name}</h3>
      <p>Subscribed</p>
    </div>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.subscription-card').forEach(card => {
    card.addEventListener('click', () => {
      openChannelPage(card.dataset.channelId);
    });
  });

  subscriptionsPage.style.display = 'block';
}

// Render history page
function renderHistoryPage() {
  const user = auth.getCurrentUser();
  const grid = document.getElementById('historyGrid');
  const emptyState = document.getElementById('historyEmptyState');

  if (!user || !user.watchHistory || user.watchHistory.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    historyPage.style.display = 'block';
    return;
  }

  // Get video details for watch history
  const historyVideos = user.watchHistory.map(h => {
    const video = videos.find(v => v.id === h.videoId);
    return video ? { ...video, watchedAt: h.watchedAt, lastPosition: h.lastPosition } : null;
  }).filter(Boolean);

  if (historyVideos.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    historyPage.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Render history cards with remove button
  grid.innerHTML = historyVideos.map(video => `
    <article class="video-card history-video-card" data-video-id="${video.id}">
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${video.duration}</span>
        ${video.lastPosition ? `<div class="watch-progress-bar"><div class="watch-progress" style="width: ${(video.lastPosition / parseVideoDuration(video.duration)) * 100}%"></div></div>` : ''}
        <button class="remove-history-btn" data-video-id="${video.id}" title="Remove from history">
          <i class="ph ph-x"></i>
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
            <span>${utils.timeAgo(video.watchedAt)}</span>
            ${video.lastPosition ? `<span> • ${Math.floor(video.lastPosition / 60)}:${String(Math.floor(video.lastPosition % 60)).padStart(2, '0')} watched</span>` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.remove-history-btn')) {
        const videoId = card.dataset.videoId;
        openVideoPlayer(videoId);
      }
    });
  });

  // Add remove button handlers
  grid.querySelectorAll('.remove-history-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoId = btn.dataset.videoId;
      removeFromHistory(videoId);
    });
  });

  historyPage.style.display = 'block';
}

// Remove single item from history
function removeFromHistory(videoId) {
  const user = auth.getCurrentUser();
  if (!user || !user.watchHistory) return;

  user.watchHistory = user.watchHistory.filter(h => h.videoId !== videoId);

  // Save
  const users = auth.getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    users[userIndex].watchHistory = user.watchHistory;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  auth.saveUser(user, true);

  // Re-render
  renderHistoryPage();
  utils.showToast('Removed from watch history');
}

// Render liked videos page
function renderLikedPage() {
  const user = auth.getCurrentUser();
  const grid = document.getElementById('likedGrid');
  const emptyState = document.getElementById('likedEmptyState');

  if (!user || !user.likedVideos || user.likedVideos.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    likedVideosPage.style.display = 'block';
    return;
  }

  const likedVideosList = user.likedVideos.map(id => videos.find(v => v.id === id)).filter(Boolean);

  if (likedVideosList.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    likedVideosPage.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = likedVideosList.map(renderVideoCard).join('');

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      openVideoPlayer(videoId);
    });
  });

  likedVideosPage.style.display = 'block';
}

// Render saved videos page
function renderSavedPage() {
  const user = auth.getCurrentUser();
  const grid = document.getElementById('savedGrid');
  const emptyState = document.getElementById('savedEmptyState');

  if (!user || !user.savedVideos || user.savedVideos.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    savedVideosPage.style.display = 'block';
    return;
  }

  const savedVideosList = user.savedVideos.map(s => videos.find(v => v.id === s.videoId)).filter(Boolean);

  if (savedVideosList.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    savedVideosPage.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = savedVideosList.map(renderVideoCard).join('');

  // Add click handlers
  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.dataset.videoId;
      openVideoPlayer(videoId);
    });
  });

  savedVideosPage.style.display = 'block';
}

// Open playlist page
function openPlaylistPage(playlistId) {
  const user = auth.getCurrentUser();
  if (!user || !user.playlists) {
    utils.showToast('Please sign in to view playlists');
    return;
  }

  const playlist = user.playlists.find(p => p.id === playlistId);
  if (!playlist) {
    utils.showToast('Playlist not found');
    return;
  }

  // Hide other pages
  mainContent.style.display = 'none';
  videoPlayerPage.classList.remove('active');
  historyPage.style.display = 'none';
  likedVideosPage.style.display = 'none';
  savedVideosPage.style.display = 'none';
  subscriptionsPage.style.display = 'none';
  channelPage.style.display = 'none';

  // Set playlist info
  const playlistName = document.getElementById('playlistName');
  const playlistMeta = document.getElementById('playlistMeta');
  const playlistVideos = document.getElementById('playlistVideos');

  playlistName.textContent = playlist.name;
  playlistMeta.textContent = `${playlist.videos.length} videos`;

  // Render playlist videos
  const playlistVideoData = playlist.videos
    .map(videoId => videos.find(v => v.id === videoId))
    .filter(Boolean);

  if (playlistVideoData.length === 0) {
    playlistVideos.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-video-camera-slash"></i><h3>No videos in this playlist</h3></div>';
  } else {
    playlistVideos.innerHTML = playlistVideoData.map((video, index) => `
      <div class="playlist-video-item" data-video-id="${video.id}">
        <span class="video-number">${index + 1}</span>
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}">
          <span class="video-duration">${video.duration}</span>
        </div>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-channel">${video.channel.name}</div>
        </div>
      </div>
    `).join('');

    // Add click handlers
    playlistVideos.querySelectorAll('.playlist-video-item').forEach(item => {
      item.addEventListener('click', () => {
        openVideoPlayer(item.dataset.videoId);
      });
    });
  }

  const playlistPage = document.getElementById('playlistPage');
  if (playlistPage) {
    playlistPage.style.display = 'block';
  }

  currentRoute = 'playlist';
}

// Open channel page
function openChannelPage(channelId) {
  // Find channel (could be user channel or video channel)
  const user = auth.getCurrentUser();
  let channel = null;

  // Check if it's the user's own channel
  if (user && user.channel && user.channel.id === channelId) {
    channel = user.channel;
    channel.avatar = user.avatar;
    channel.banner = user.banner;
    channel.isOwner = true;
  } else {
    // Find in videos
    const video = videos.find(v => v.channel.id === channelId);
    if (video) {
      channel = { ...video.channel, isOwner: false };
    }
  }

  if (!channel) {
    utils.showToast('Channel not found');
    return;
  }

  // Hide other pages
  mainContent.style.display = 'none';
  videoPlayerPage.classList.remove('active');
  historyPage.style.display = 'none';
  likedVideosPage.style.display = 'none';
  savedVideosPage.style.display = 'none';
  subscriptionsPage.style.display = 'none';

  // Set channel info
  const bannerImg = document.getElementById('channelBannerImg');
  const channelAvatar = document.getElementById('channelPageAvatar');
  const channelName = document.getElementById('channelPageName');
  const channelHandle = document.getElementById('channelPageHandle');
  const channelStats = document.getElementById('channelPageStats');
  const subscribeBtn = document.getElementById('channelSubscribeBtn');

  bannerImg.src = channel.banner || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&h=360&fit=crop';
  channelAvatar.src = channel.avatar;
  channelName.textContent = channel.name;
  channelHandle.textContent = '@' + (channel.customUrl || channel.name.toLowerCase().replace(/\s+/g, ''));
  channelStats.textContent = utils.formatSubscribers(channel.subscribers);

  // Update subscribe button
  const isSubscribed = auth.isSubscribed(channel.id);
  subscribeBtn.classList.toggle('subscribed', isSubscribed);
  subscribeBtn.querySelector('span').textContent = isSubscribed ? 'Subscribed' : 'Subscribe';
  subscribeBtn.dataset.channelId = channel.id;
  subscribeBtn.dataset.channelName = channel.name;
  subscribeBtn.dataset.channelAvatar = channel.avatar;

  // Show/hide settings button for channel owner
  const currentUser = auth.getCurrentUser();
  if (currentUser && currentUser.channel && currentUser.channel.id === channel.id) {
    channelSettingsBtn.style.display = 'flex';
    channelSettingsBtn.dataset.channelId = channel.id;
  } else {
    channelSettingsBtn.style.display = 'none';
  }

  // Load channel videos
  const channelVideos = videos.filter(v => v.channel.id === channel.id);
  const content = document.getElementById('channelContent');

  if (channelVideos.length === 0) {
    content.innerHTML = '<div class="empty-state" style="display: flex;"><i class="ph-fill ph-video-camera-slash"></i><h3>No videos yet</h3><p>This channel has not uploaded any videos</p></div>';
  } else {
    content.innerHTML = `<div class="video-grid">${channelVideos.map(renderVideoCard).join('')}</div>`;

    // Add click handlers
    content.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', () => {
        openVideoPlayer(card.dataset.videoId);
      });
    });
  }

  // Set channel ID on tabs for tab switching
  const channelTabs = document.querySelector('.channel-tabs');
  if (channelTabs) {
    channelTabs.dataset.channelId = channelId;
  }

  channelPage.style.display = 'block';
  currentRoute = 'channel';
}

// Open channel settings modal
function openChannelSettings() {
  const currentUser = auth.getCurrentUser();
  if (!currentUser || !currentUser.channel) return;

  const channel = currentUser.channel;

  // Populate form with current values
  settingsBannerUrl.value = currentUser.banner || '';
  settingsAvatarUrl.value = currentUser.avatar || '';
  settingsChannelName.value = channel.name || '';
  settingsChannelDescription.value = channel.description || '';
  settingsCustomUrl.value = channel.customUrl || '';
  settingsLocation.value = currentUser.location || '';

  // Update previews
  if (currentUser.banner) {
    settingsBannerPreview.src = currentUser.banner;
    settingsBannerPreview.style.display = 'block';
    settingsBannerPlaceholder.style.display = 'none';
  } else {
    settingsBannerPreview.style.display = 'none';
    settingsBannerPlaceholder.style.display = 'flex';
  }

  if (currentUser.avatar) {
    settingsAvatarPreview.src = currentUser.avatar;
  }

  // Update character counts
  channelNameCount.textContent = settingsChannelName.value.length;
  channelDescCount.textContent = settingsChannelDescription.value.length;

  channelSettingsModal.style.display = 'flex';
}

// Close channel settings modal
function closeChannelSettings() {
  channelSettingsModal.style.display = 'none';
}

// Save channel settings
function saveChannelSettings() {
  const currentUser = auth.getCurrentUser();
  if (!currentUser) return;

  const updates = {
    banner: settingsBannerUrl.value,
    avatar: settingsAvatarUrl.value,
    location: settingsLocation.value,
    channel: {
      name: settingsChannelName.value,
      description: settingsChannelDescription.value,
      customUrl: settingsCustomUrl.value
    }
  };

  const result = auth.updateProfile(updates);

  if (result.success) {
    closeChannelSettings();

    // Refresh channel page if open
    if (channelPage.style.display === 'block') {
      const channelId = currentUser.channel.id;
      openChannelPage(channelId);
    }

    // Show success toast
    showToast('Channel settings saved successfully');
  } else {
    showToast(result.error || 'Failed to save settings', 'error');
  }
}

// Show video options menu
function showVideoOptionsMenu(videoId, event) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  const currentUser = auth.getCurrentUser();
  const isOwner = currentUser && currentUser.channel && currentUser.channel.id === video.channel.id;

  // Show/hide edit and delete options based on ownership
  if (editVideoBtn) editVideoBtn.style.display = isOwner ? 'flex' : 'none';
  if (deleteVideoBtn) deleteVideoBtn.style.display = isOwner ? 'flex' : 'none';
  if (changeVisibilityBtn) changeVisibilityBtn.style.display = isOwner ? 'flex' : 'none';

  // Position menu
  const rect = event.target.getBoundingClientRect();
  videoOptionsMenu.style.top = `${rect.bottom + 8}px`;
  videoOptionsMenu.style.left = `${rect.left - 100}px`;
  videoOptionsMenu.style.display = 'block';

  // Store current video ID
  videoOptionsMenu.dataset.videoId = videoId;
}

// Hide video options menu
function hideVideoOptionsMenu() {
  videoOptionsMenu.style.display = 'none';
}

// Open video edit modal
function openVideoEditModal(videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  currentEditingVideoId = videoId;

  // Populate form
  editVideoTitle.value = video.title || '';
  editVideoDescription.value = video.description || '';
  editVideoCategory.value = video.category || 'all';
  editVideoTags.value = video.tags ? video.tags.join(', ') : '';
  editVideoVisibility.value = video.visibility || 'public';
  editVideoThumbnail.value = video.thumbnail || '';

  // Update character counts
  editTitleCount.textContent = editVideoTitle.value.length;
  editDescCount.textContent = editVideoDescription.value.length;

  videoEditModal.style.display = 'flex';
  hideVideoOptionsMenu();
}

// Close video edit modal
function closeVideoEditModal() {
  videoEditModal.style.display = 'none';
  currentEditingVideoId = null;
}

// Save video edits
function saveVideoEdits() {
  if (!currentEditingVideoId) return;

  const videoIndex = videos.findIndex(v => v.id === currentEditingVideoId);
  if (videoIndex === -1) return;

  // Update video
  videos[videoIndex].title = editVideoTitle.value;
  videos[videoIndex].description = editVideoDescription.value;
  videos[videoIndex].category = editVideoCategory.value;
  videos[videoIndex].tags = editVideoTags.value.split(',').map(t => t.trim()).filter(Boolean);
  videos[videoIndex].visibility = editVideoVisibility.value;
  if (editVideoThumbnail.value) {
    videos[videoIndex].thumbnail = editVideoThumbnail.value;
  }

  // Save to localStorage
  localStorage.setItem('videoshare_videos', JSON.stringify(videos));

  closeVideoEditModal();
  showToast('Video updated successfully!', 'success');

  // Refresh current view
  if (appCurrentCategory === 'all') {
    loadVideos();
  }

  // If video player is open, refresh it
  if (appCurrentVideo && appCurrentVideo.id === currentEditingVideoId) {
    openVideoPlayer(currentEditingVideoId);
  }
}

// Delete video
function deleteVideo(videoId) {
  const videoIndex = videos.findIndex(v => v.id === videoId);
  if (videoIndex === -1) return;

  // Remove from videos array
  videos.splice(videoIndex, 1);

  // Save to localStorage
  localStorage.setItem('videoshare_videos', JSON.stringify(videos));

  deleteConfirmModal.style.display = 'none';
  showToast('Video deleted successfully!', 'success');

  // Refresh current view
  if (appCurrentCategory === 'all') {
    loadVideos();
  }

  // Close video player if open
  if (appCurrentVideo && appCurrentVideo.id === videoId) {
    closeVideoPlayer();
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <i class="ph-fill ${type === 'success' ? 'ph-check-circle' : 'ph-warning-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Setup notification event listeners
function setupNotificationEventListeners() {
  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationsDropdown.classList.toggle('show');
    userDropdown.classList.remove('show');

    if (auth.getCurrentUser()) {
      renderNotifications();
    }
  });

  // Mark all as read
  document.querySelector('.mark-all-read')?.addEventListener('click', () => {
    auth.markAllNotificationsRead();
    updateNotificationBadge();
    renderNotifications();
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    notificationsDropdown.classList.remove('show');
  });

  notificationsDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// Render notifications
function renderNotifications() {
  const user = auth.getCurrentUser();
  const list = document.getElementById('notificationsList');

  if (!user || !user.notifications || user.notifications.length === 0) {
    list.innerHTML = `
      <div class="notification-empty">
        <i class="ph-fill ph-bell"></i>
        <p>No notifications yet</p>
      </div>
    `;
    return;
  }

  list.innerHTML = user.notifications.map(notif => `
    <div class="notification-item ${notif.read ? '' : 'unread'}" data-notification-id="${notif.id}">
      <img src="${notif.thumbnail || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=60&fit=crop'}" alt="">
      <div class="notification-content">
        <p class="notification-text">${notif.text}</p>
        <span class="notification-time">${utils.timeAgo(new Date(notif.createdAt))}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  list.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => {
      const notifId = item.dataset.notificationId;
      auth.markNotificationRead(notifId);
      updateNotificationBadge();

      if (item.dataset.videoId) {
        openVideoPlayer(item.dataset.videoId);
      }
    });
  });
}

// Load and render videos
async function loadVideos() {
  await utils.simulateNetworkDelay();

  // Reset pagination
  currentPage = 1;
  let filteredVideos = utils.filterVideos(videos, appCurrentCategory, appSearchQuery);

  // Apply duration filter
  if (appCurrentDuration !== 'all') {
    filteredVideos = filteredVideos.filter(video => {
      const durationSecs = parseVideoDuration(video.duration);
      switch (appCurrentDuration) {
        case 'short': return durationSecs < 240; // Under 4 minutes
        case 'medium': return durationSecs >= 240 && durationSecs <= 1200; // 4-20 minutes
        case 'long': return durationSecs > 1200; // Over 20 minutes
        default: return true;
      }
    });
  }

  allFilteredVideos = filteredVideos;
  hasMoreVideos = allFilteredVideos.length > VIDEOS_PER_PAGE;

  const videosToRender = allFilteredVideos.slice(0, VIDEOS_PER_PAGE);
  components.renderVideoGrid(videosToRender);

  // Add or remove load more button
  updateLoadMoreButton();

  // Render continue watching section if user is logged in
  renderContinueWatching();
}

// Load more videos (for infinite scroll)
async function loadMoreVideos() {
  if (isLoadingMore || !hasMoreVideos) return;

  isLoadingMore = true;
  showLoadingSpinner();

  await utils.simulateNetworkDelay(300);

  currentPage++;
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const newVideos = allFilteredVideos.slice(startIndex, endIndex);

  // Append new videos to grid
  const grid = document.getElementById('videoGrid');
  const existingCards = grid.querySelectorAll('.video-card');
  const existingCount = existingCards.length;

  newVideos.forEach((video, index) => {
    const cardHtml = components.renderVideoCard(video);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHtml;
    const card = tempDiv.firstElementChild;
    grid.appendChild(card);

    // Add click handlers
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.video-menu')) {
        openVideoPlayer(video.id);
      }
    });

    const menuBtn = card.querySelector('.video-menu');
    if (menuBtn) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showVideoOptionsMenu(video.id, e);
      });
    }

    const channelLink = card.querySelector('.video-channel');
    if (channelLink) {
      channelLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openChannelPage(video.channel.id);
      });
    }
  });

  hasMoreVideos = endIndex < allFilteredVideos.length;
  updateLoadMoreButton();

  hideLoadingSpinner();
  isLoadingMore = false;
}

// Show loading spinner
function showLoadingSpinner() {
  let spinner = document.getElementById('infiniteScrollSpinner');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.id = 'infiniteScrollSpinner';
    spinner.className = 'infinite-scroll-spinner';
    spinner.innerHTML = '<div class="spinner"></div><span>Loading more videos...</span>';
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.parentNode.insertBefore(spinner, videoGrid.nextSibling);
  }
  spinner.style.display = 'flex';
}

// Hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById('infiniteScrollSpinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}

// Update load more button visibility
function updateLoadMoreButton() {
  let loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) {
    loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'loadMoreBtn';
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.textContent = 'Load More';
    loadMoreBtn.addEventListener('click', loadMoreVideos);

    const gridContainer = document.querySelector('.video-grid-container');
    if (gridContainer) {
      gridContainer.parentNode.insertBefore(loadMoreBtn, gridContainer.nextSibling);
    }
  }

  loadMoreBtn.style.display = hasMoreVideos ? 'block' : 'none';
}

// Infinite scroll handler
function setupInfiniteScroll() {
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = requestAnimationFrame(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when within 500px of bottom
      if (documentHeight - scrollPosition < 500) {
        loadMoreVideos();
      }

      // Show/hide scroll to top button
      const scrollToTopBtn = document.getElementById('scrollToTopBtn');
      if (scrollToTopBtn) {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      }
    });
  });

  // Scroll to top button click handler
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Render continue watching section
function renderContinueWatching() {
  const continueSection = document.getElementById('continueWatchingSection');
  const continueGrid = document.getElementById('continueWatchingGrid');
  const user = auth.getCurrentUser();

  if (!user || !user.watchHistory || user.watchHistory.length === 0 || appSearchQuery || appCurrentCategory !== 'all') {
    continueSection.style.display = 'none';
    return;
  }

  // Get videos that have watch progress (not completed)
  const continueVideos = user.watchHistory
    .filter(h => h.lastPosition && h.lastPosition > 0)
    .map(h => {
      const video = videos.find(v => v.id === h.videoId);
      if (!video) return null;
      const duration = parseVideoDuration(video.duration);
      const progress = (h.lastPosition / duration) * 100;
      // Only show if less than 95% watched
      if (progress >= 95) return null;
      return { ...video, lastPosition: h.lastPosition, progress };
    })
    .filter(Boolean)
    .slice(0, 6);

  if (continueVideos.length === 0) {
    continueSection.style.display = 'none';
    return;
  }

  continueSection.style.display = 'block';
  continueGrid.innerHTML = continueVideos.map(video => `
    <article class="video-card" data-video-id="${video.id}">
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <span class="video-duration">${video.duration}</span>
        <div class="watch-progress-bar">
          <div class="watch-progress" style="width: ${video.progress}%"></div>
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
            <span>${Math.round(video.progress)}% watched</span>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Add click handlers
  continueGrid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      openVideoPlayer(card.dataset.videoId);
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
  document.getElementById('thumbnailUrlInput').value = '';

  // Reset thumbnail preview
  const thumbnailPreviewImg = document.getElementById('thumbnailPreviewImg');
  const thumbnailPlaceholder = document.getElementById('thumbnailPlaceholder');
  if (thumbnailPreviewImg) {
    thumbnailPreviewImg.style.display = 'none';
    thumbnailPreviewImg.src = '';
  }
  if (thumbnailPlaceholder) {
    thumbnailPlaceholder.style.display = 'flex';
  }
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
  const thumbnailUrl = document.getElementById('thumbnailUrlInput').value.trim();

  if (!title || !category) {
    utils.showToast('Please fill in required fields', 'error');
    return;
  }

  // Default thumbnail if none provided
  const defaultThumbnails = [
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&h=360&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=360&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=360&fit=crop'
  ];
  const thumbnail = thumbnailUrl || defaultThumbnails[Math.floor(Math.random() * defaultThumbnails.length)];

  uploadForm.style.display = 'none';
  uploadPreview.style.display = 'none';
  uploadProgress.style.display = 'block';

  // Simulate upload progress
  for (let i = 0; i <= 100; i += 5) {
    await new Promise(r => setTimeout(r, 100));
    uploadProgressBar.style.width = i + '%';
    uploadProgressText.textContent = `Uploading... ${i}%`;
  }

  const user = auth.getCurrentUser();

  // Add new video to list
  const newVideo = {
    id: utils.generateId(),
    title,
    thumbnail: thumbnail,
    duration: '0:00',
    views: 0,
    uploadedAt: new Date(),
    channel: {
      id: user.channel.id,
      name: user.channel.name,
      avatar: user.avatar,
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
    localStorage.setItem('videoshare_volume', currentVolume);
    volumeBtn.innerHTML = isMuted
      ? '<i class="ph-fill ph-speaker-x"></i>'
      : '<i class="ph-fill ph-speaker-high"></i>';
  });

  volumeSlider.addEventListener('input', (e) => {
    currentVolume = e.target.value / 100;
    videoElement.volume = currentVolume;
    localStorage.setItem('videoshare_volume', currentVolume);
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

    // Save playback position every 5 seconds
    if (appCurrentVideo && Math.floor(videoElement.currentTime) % 5 === 0) {
      savePlaybackPosition(appCurrentVideo.id, videoElement.currentTime);
    }
  });

  // Save position when pausing
  videoElement.addEventListener('pause', () => {
    if (appCurrentVideo) {
      savePlaybackPosition(appCurrentVideo.id, videoElement.currentTime);
    }
  });

  // Save position before leaving
  window.addEventListener('beforeunload', () => {
    if (appCurrentVideo && videoElement.currentTime > 0) {
      savePlaybackPosition(appCurrentVideo.id, videoElement.currentTime);
    }
  });

  function savePlaybackPosition(videoId, position) {
    const user = auth.getCurrentUser();
    if (!user || !user.watchHistory) return;

    // Find and update the video in watch history
    const historyItem = user.watchHistory.find(h => h.videoId === videoId);
    if (historyItem) {
      historyItem.lastPosition = Math.floor(position);
      historyItem.watchedAt = new Date().toISOString();

      // Save to localStorage
      const users = auth.getUsersFromStorage();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].watchHistory = user.watchHistory;
        localStorage.setItem('videoshare_users', JSON.stringify(users));
      }
      auth.saveUser(user, true);
    }
  }

  videoElement.addEventListener('ended', () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    // Auto-play next video if autoplay is enabled
    if (appCurrentVideo && autoplayEnabled) {
      const recommendations = utils.getRecommendations(appCurrentVideo.id, 1);
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

  // Quality selection
  const qualityBtn = document.getElementById('qualityBtn');
  const qualities = ['Auto', '1080p', '720p', '480p', '360p'];
  let currentQualityIndex = 0;

  qualityBtn.addEventListener('click', () => {
    currentQualityIndex = (currentQualityIndex + 1) % qualities.length;
    const quality = qualities[currentQualityIndex];
    qualityBtn.querySelector('span').textContent = quality;
    utils.showToast(`Quality set to ${quality}`);
  });

  // Picture-in-Picture
  const pipBtn = document.getElementById('pipBtn');

  pipBtn.addEventListener('click', async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoElement.requestPictureInPicture();
      }
    } catch (error) {
      utils.showToast('Picture-in-Picture not supported');
    }
  });

  // Autoplay toggle
  const autoplayBtn = document.getElementById('autoplayBtn');
  let autoplayEnabled = localStorage.getItem('videoshare_autoplay') !== 'false';

  // Set initial state
  autoplayBtn.classList.toggle('active', autoplayEnabled);

  autoplayBtn.addEventListener('click', () => {
    autoplayEnabled = !autoplayEnabled;
    localStorage.setItem('videoshare_autoplay', autoplayEnabled);
    autoplayBtn.classList.toggle('active', autoplayEnabled);
    utils.showToast(autoplayEnabled ? 'Autoplay enabled' : 'Autoplay disabled');
  });

  // Function to get autoplay state
  window.getAutoplayEnabled = () => autoplayEnabled;

  // Loop button
  const loopBtn = document.getElementById('loopBtn');
  let loopEnabled = localStorage.getItem('videoshare_loop') === 'true';

  // Set initial state
  loopBtn.classList.toggle('active', loopEnabled);
  videoElement.loop = loopEnabled;

  loopBtn.addEventListener('click', () => {
    loopEnabled = !loopEnabled;
    videoElement.loop = loopEnabled;
    localStorage.setItem('videoshare_loop', loopEnabled);
    loopBtn.classList.toggle('active', loopEnabled);
    utils.showToast(loopEnabled ? 'Loop enabled' : 'Loop disabled');
  });

  // Mini player
  const miniPlayerBtn = document.getElementById('miniPlayerBtn');
  const miniPlayer = document.getElementById('miniPlayer');
  const miniPlayerVideo = document.getElementById('miniPlayerVideo');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const miniCloseBtn = document.getElementById('miniCloseBtn');
  const miniProgressBar = document.getElementById('miniProgressBar');
  const miniTime = document.getElementById('miniTime');
  const miniPlayerTitle = document.getElementById('miniPlayerTitle');
  const miniPlayerChannel = document.getElementById('miniPlayerChannel');
  let isMiniPlayerActive = false;

  if (miniPlayerBtn) {
    miniPlayerBtn.addEventListener('click', () => {
      if (!appCurrentVideo) return;

      // Transfer video source to mini player
      if (videoElement.src) {
        miniPlayerVideo.src = videoElement.src;
        miniPlayerVideo.currentTime = videoElement.currentTime;
        miniPlayerVideo.volume = currentVolume;
        miniPlayerVideo.muted = isMuted;

        if (!videoElement.paused) {
          miniPlayerVideo.play();
          miniPlayBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
        }

        // Update mini player info
        miniPlayerTitle.textContent = appCurrentVideo.title;
        miniPlayerChannel.textContent = appCurrentVideo.channel.name;

        // Show mini player, hide main player
        miniPlayer.style.display = 'block';
        videoPlayerPage.classList.remove('active');
        mainContent.style.display = 'block';

        isMiniPlayerActive = true;
        utils.showToast('Mini player activated');
      }
    });
  }

  if (miniPlayBtn) {
    miniPlayBtn.addEventListener('click', () => {
      if (miniPlayerVideo.paused) {
        miniPlayerVideo.play();
        miniPlayBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
      } else {
        miniPlayerVideo.pause();
        miniPlayBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
      }
    });
  }

  if (miniCloseBtn) {
    miniCloseBtn.addEventListener('click', () => {
      miniPlayer.style.display = 'none';
      isMiniPlayerActive = false;
      miniPlayerVideo.pause();
    });
  }

  if (miniPlayerVideo) {
    miniPlayerVideo.addEventListener('timeupdate', () => {
      const progress = (miniPlayerVideo.currentTime / miniPlayerVideo.duration) * 100;
      miniProgressBar.style.width = progress + '%';

      const mins = Math.floor(miniPlayerVideo.currentTime / 60);
      const secs = Math.floor(miniPlayerVideo.currentTime % 60);
      miniTime.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    });

    miniPlayerVideo.addEventListener('ended', () => {
      if (loopEnabled) {
        miniPlayerVideo.play();
      } else if (autoplayEnabled) {
        const recommendations = utils.getRecommendations(appCurrentVideo.id, 1);
        if (recommendations.length > 0) {
          openVideoPlayer(recommendations[0].id);
        }
      }
    });
  }

  // Theater mode
  const theaterBtn = document.getElementById('theaterBtn');
  let theaterMode = localStorage.getItem('videoshare_theater') === 'true';

  if (theaterBtn) {
    theaterBtn.addEventListener('click', () => {
      theaterMode = !theaterMode;
      localStorage.setItem('videoshare_theater', theaterMode);
      document.body.classList.toggle('theater-mode', theaterMode);
      theaterBtn.classList.toggle('active', theaterMode);
      utils.showToast(theaterMode ? 'Theater mode enabled' : 'Theater mode disabled');
    });

    // Apply saved theater mode
    if (theaterMode) {
      document.body.classList.add('theater-mode');
      theaterBtn.classList.add('active');
    }
  }

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
    const user = auth.getCurrentUser();
    if (!user) {
      openLoginModal();
      utils.showToast('Please sign in to like videos');
      return;
    }

    if (!appCurrentVideo) return;

    const result = auth.toggleLikeVideo(appCurrentVideo.id);
    if (result.success) {
      appCurrentVideo.liked = result.isLiked;
      appCurrentVideo.likes += result.isLiked ? 1 : -1;
      components.updateVideoPlayerInfo(appCurrentVideo);
    }
  });

  dislikeBtn.addEventListener('click', () => {
    utils.showToast('Dislike recorded');
  });

  shareBtn.addEventListener('click', () => {
    if (!appCurrentVideo) return;

    // Get current timestamp if video is playing
    let timestampParam = '';
    if (videoElement && videoElement.currentTime > 0) {
      const currentSecs = Math.floor(videoElement.currentTime);
      timestampParam = `&t=${currentSecs}`;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const videoUrl = `${baseUrl}?v=${appCurrentVideo.id}${timestampParam}`;
    const videoTitle = appCurrentVideo.title || 'Check out this video';

    // Set share link
    shareLinkInput.value = videoUrl;

    // Update social share links
    const encodedUrl = encodeURIComponent(videoUrl);
    const encodedTitle = encodeURIComponent(videoTitle);

    shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    shareReddit.href = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
    shareWhatsApp.href = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

    // Open modal
    shareModal.style.display = 'flex';
  });

  saveBtn.addEventListener('click', () => {
    if (!appCurrentVideo) return;
    openSaveToPlaylistModal(appCurrentVideo.id);
  });

  // Transcript button
  const transcriptBtn = document.getElementById('transcriptBtn');
  const transcriptSection = document.getElementById('transcriptSection');
  const transcriptContent = document.getElementById('transcriptContent');
  const transcriptCloseBtn = document.getElementById('transcriptCloseBtn');

  if (transcriptBtn) {
    transcriptBtn.addEventListener('click', () => {
      if (!appCurrentVideo) return;

      // Generate or get transcript
      const transcript = generateTranscript(appCurrentVideo);

      if (transcript.length === 0) {
        utils.showToast('No transcript available for this video');
        return;
      }

      // Render transcript
      renderTranscript(transcript);

      // Show/hide transcript section
      if (transcriptSection.style.display === 'block') {
        transcriptSection.style.display = 'none';
      } else {
        transcriptSection.style.display = 'block';
      }
    });
  }

  if (transcriptCloseBtn) {
    transcriptCloseBtn.addEventListener('click', () => {
      transcriptSection.style.display = 'none';
    });
  }

  // Download button
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      if (!appCurrentVideo) return;

      const videoUrl = appCurrentVideo.videoUrl;
      if (!videoUrl) {
        utils.showToast('Download not available for this video');
        return;
      }

      try {
        utils.showToast('Preparing download...');

        // Create an anchor element to trigger download
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = `${appCurrentVideo.title}.mp4`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        utils.showToast('Download started!');
      } catch (error) {
        console.error('Download error:', error);
        utils.showToast('Download failed. Please try again.');
      }
    });
  }

  subscribeBtn.addEventListener('click', () => {
    const user = auth.getCurrentUser();
    if (!user) {
      openLoginModal();
      utils.showToast('Please sign in to subscribe');
      return;
    }

    if (!appCurrentVideo) return;

    const isSubscribed = auth.isSubscribed(appCurrentVideo.channel.id);
    if (isSubscribed) {
      auth.unsubscribeFromChannel(appCurrentVideo.channel.id);
      appCurrentVideo.subscribed = false;
      appCurrentVideo.channel.subscribers = Math.max(0, appCurrentVideo.channel.subscribers - 1);
    } else {
      auth.subscribeToChannel(appCurrentVideo.channel.id, appCurrentVideo.channel.name, appCurrentVideo.channel.avatar);
      appCurrentVideo.subscribed = true;
      appCurrentVideo.channel.subscribers++;
    }
    components.updateVideoPlayerInfo(appCurrentVideo);
  });
}

// Generate mock transcript for a video
function generateTranscript(video) {
  // Check if video has transcript data
  if (video.transcript && video.transcript.length > 0) {
    return video.transcript;
  }

  // Generate mock transcript based on video title and description
  const title = video.title || '';
  const description = video.description || '';

  // Generate timestamps based on video duration
  const durationSecs = parseVideoDuration(video.duration) || 300;
  const lineCount = Math.min(Math.floor(durationSecs / 30), 20); // One line every 30 seconds, max 20 lines

  const sampleLines = [
    "Welcome back to another video!",
    "Today we're going to be discussing an exciting topic.",
    "Let's dive right into it.",
    "First, let me show you something interesting.",
    "As you can see here, this is really important.",
    "Now, let's move on to the next part.",
    "This is where things get interesting.",
    "Let me explain this in more detail.",
    "You might be wondering why this matters.",
    "The key point here is quite simple.",
    "Let's take a look at some examples.",
    "Here's another thing to consider.",
    "This is actually quite common in practice.",
    "Now we can see the results clearly.",
    "Let me demonstrate with a quick demo.",
    "This is actually really cool once you try it.",
    "The important thing to remember is.",
    "In the next section, we'll cover.",
    "Thanks for watching! Don't forget to like and subscribe.",
    "Leave a comment below with your thoughts!"
  ];

  const transcript = [];
  for (let i = 0; i < lineCount; i++) {
    transcript.push({
      time: i * 30,
      text: sampleLines[i % sampleLines.length]
    });
  }

  return transcript;
}

// Render transcript
function renderTranscript(transcript) {
  const transcriptContent = document.getElementById('transcriptContent');
  if (!transcriptContent) return;

  transcriptContent.innerHTML = transcript.map((line, index) => `
    <div class="transcript-line" data-time="${line.time}" data-index="${index}">
      <span class="transcript-time">${formatTime(line.time)}</span>
      <span class="transcript-text">${line.text}</span>
    </div>
  `).join('');

  // Add click handlers to seek to timestamp
  transcriptContent.querySelectorAll('.transcript-line').forEach(line => {
    line.addEventListener('click', () => {
      const time = parseInt(line.dataset.time);
      if (window.seekToTime) {
        window.seekToTime(time);
      } else if (videoElement) {
        videoElement.currentTime = time;
        videoElement.play();
      }

      // Highlight active line
      transcriptContent.querySelectorAll('.transcript-line').forEach(l => l.classList.remove('active'));
      line.classList.add('active');
    });
  });

  // Update active line on timeupdate
  videoElement.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(videoElement.currentTime);
    transcriptContent.querySelectorAll('.transcript-line').forEach(line => {
      const lineTime = parseInt(line.dataset.time);
      const nextLine = transcriptContent.querySelector(`.transcript-line[data-index="${parseInt(line.dataset.index) + 1}"]`);
      const nextTime = nextLine ? parseInt(nextLine.dataset.time) : Infinity;

      if (currentTime >= lineTime && currentTime < nextTime) {
        line.classList.add('active');
        line.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        line.classList.remove('active');
      }
    });
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
  appCurrentVideo = videos.find(v => v.id === videoId);
  if (!appCurrentVideo) return;

  // Increment view count
  appCurrentVideo.views++;

  // Add to watch history if logged in
  const user = auth.getCurrentUser();
  if (user) {
    auth.addToWatchHistory(videoId);
  }

  // Hide main content, show player
  mainContent.style.display = 'none';
  channelPage.style.display = 'none';
  historyPage.style.display = 'none';
  likedVideosPage.style.display = 'none';
  savedVideosPage.style.display = 'none';
  subscriptionsPage.style.display = 'none';
  videoPlayerPage.style.display = '';
  videoPlayerPage.classList.add('active');

  // Load video
  videoElement.src = appCurrentVideo.videoUrl;
  components.updateVideoPlayerInfo(appCurrentVideo);
  components.renderRecommendations(videoId);
  components.renderComments(window.mockData.comments);

  // Update like/save state based on user
  if (user) {
    const isLiked = auth.isVideoLiked(videoId);
    const isSaved = auth.isVideoSaved(videoId);

    const likeBtnEl = document.getElementById('likeBtn');
    const saveBtnEl = document.getElementById('saveBtn');

    likeBtnEl.classList.toggle('active', isLiked);
    saveBtnEl.classList.toggle('active', isSaved);
  }

  // Auto-play
  videoElement.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';

  // Restore playback position if available (URL timestamp takes priority over saved position)
  let seekTime = 0;
  if (window.pendingTimestamp) {
    seekTime = window.pendingTimestamp;
    window.pendingTimestamp = null;
  } else {
    seekTime = getSavedPlaybackPosition(videoId);
  }

  if (seekTime && seekTime > 0) {
    videoElement.currentTime = seekTime;
  }

  // Update URL without timestamp
  window.history.pushState({}, '', `?v=${videoId}`);
}

function getSavedPlaybackPosition(videoId) {
  const user = auth.getCurrentUser();
  if (!user || !user.watchHistory) return 0;

  const historyItem = user.watchHistory.find(h => h.videoId === videoId);
  return historyItem?.lastPosition || 0;
}

// Show home page
function showHomePage() {
  mainContent.style.display = 'block';
  videoPlayerPage.classList.remove('active');
  channelPage.style.display = 'none';
  historyPage.style.display = 'none';
  likedVideosPage.style.display = 'none';
  savedVideosPage.style.display = 'none';
  subscriptionsPage.style.display = 'none';

  if (videoElement.src) {
    videoElement.pause();
    videoElement.src = '';
  }
  appCurrentVideo = null;

  window.history.pushState({}, '', window.location.pathname);
}

// Handle browser back
window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get('v');
  const channelId = params.get('channel');

  if (channelId) {
    openChannelPage(channelId);
  } else if (videoId) {
    openVideoPlayer(videoId);
  } else {
    showHomePage();
  }
});

// Export functions to window for components
window.openVideoPlayer = openVideoPlayer;
window.showHomePage = showHomePage;
window.openChannelPage = openChannelPage;
window.openPlaylistPage = openPlaylistPage;
window.showVideoOptionsMenu = showVideoOptionsMenu;

// Function to seek video to specific time (for chapters)
window.seekToTime = function(time) {
  const videoElement = document.getElementById('mainVideo');
  if (videoElement && videoElement.duration) {
    videoElement.currentTime = time;
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', init);
