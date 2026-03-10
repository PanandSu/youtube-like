// Authentication Module

const AUTH_STORAGE_KEY = 'videoshare_user';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

// Default user avatar
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';

// Generate a unique ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Hash password (simple simulation - use bcrypt in production)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// Get current user from storage
function getCurrentUser() {
  try {
    const user = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!user) return null;

    const userData = JSON.parse(user);

    // Check if session is still valid
    if (userData.sessionExpiry && Date.now() > userData.sessionExpiry) {
      logout();
      return null;
    }

    return userData;
  } catch {
    return null;
  }
}

// Save user to storage
function saveUser(user, rememberMe = false) {
  const userData = {
    ...user,
    sessionExpiry: rememberMe ? Date.now() + SESSION_DURATION : null
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  return userData;
}

// Register new user
function register(email, username, password) {
  // Get existing users
  const users = getUsersFromStorage();

  // Check if email already exists
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists' };
  }

  // Check if username already exists
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: 'This username is already taken' };
  }

  // Validate password
  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' };
  }

  // Create new user
  const newUser = {
    id: generateUserId(),
    email: email.toLowerCase(),
    username: username,
    passwordHash: simpleHash(password),
    avatar: DEFAULT_AVATAR,
    banner: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1280&h=360&fit=crop',
    bio: '',
    location: '',
    channel: {
      id: generateUserId(),
      name: username + "'s Channel",
      description: '',
      subscribers: 0,
      verified: false,
      joinedDate: new Date().toISOString(),
      totalViews: 0,
      customUrl: username.toLowerCase().replace(/[^a-z0-9]/g, '')
    },
    preferences: {
      theme: 'dark',
      autoplay: true,
      notifications: true,
      country: '',
      language: 'en'
    },
    privacy: {
      publicLikes: true,
      publicHistory: false
    },
    subscribedChannels: [],
    watchHistory: [],
    likedVideos: [],
    savedVideos: [],
    likedComments: [],
    playlists: [],
    notifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };

  // Save to users list
  users.push(newUser);
  localStorage.setItem('videoshare_users', JSON.stringify(users));

  // Create session for new user (without password hash)
  const sessionUser = { ...newUser };
  delete sessionUser.passwordHash;
  saveUser(sessionUser, true);

  return { success: true, user: sessionUser };
}

// Login user
function login(email, password, rememberMe = false) {
  const users = getUsersFromStorage();

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'No account found with this email' };
  }

  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, error: 'Incorrect password' };
  }

  // Update last login
  user.lastLoginAt = new Date().toISOString();
  localStorage.setItem('videoshare_users', JSON.stringify(users));

  // Create session (without password hash)
  const sessionUser = { ...user };
  delete sessionUser.passwordHash;
  saveUser(sessionUser, rememberMe);

  return { success: true, user: sessionUser };
}

// Logout user
function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('userLoggedOut'));
  return { success: true };
}

// Forgot password (simulated)
function forgotPassword(email) {
  const users = getUsersFromStorage();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Don't reveal if email exists
    return { success: true, message: 'If an account exists, a reset link has been sent' };
  }

  // In production, send actual email
  return { success: true, message: 'Password reset link sent to your email' };
}

// Update user profile
function updateProfile(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }

  // Update allowed fields
  const allowedUpdates = ['username', 'bio', 'location', 'avatar', 'banner', 'preferences', 'privacy'];
  allowedUpdates.forEach(field => {
    if (updates[field] !== undefined) {
      users[userIndex][field] = updates[field];
      currentUser[field] = updates[field];
    }
  });

  // Update channel info if provided
  if (updates.channel) {
    Object.assign(users[userIndex].channel, updates.channel);
    Object.assign(currentUser.channel, updates.channel);
  }

  users[userIndex].updatedAt = new Date().toISOString();
  currentUser.updatedAt = new Date().toISOString();

  localStorage.setItem('videoshare_users', JSON.stringify(users));
  saveUser(currentUser, true);

  return { success: true, user: currentUser };
}

// Get all registered users
function getUsersFromStorage() {
  try {
    const users = localStorage.getItem('videoshare_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

// Subscribe to channel
function subscribeToChannel(channelId, channelName, channelAvatar) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  if (!currentUser.subscribedChannels) {
    currentUser.subscribedChannels = [];
  }

  // Check if already subscribed
  if (currentUser.subscribedChannels.find(c => c.id === channelId)) {
    return { success: false, error: 'Already subscribed' };
  }

  currentUser.subscribedChannels.push({
    id: channelId,
    name: channelName,
    avatar: channelAvatar,
    subscribedAt: new Date().toISOString()
  });

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].subscribedChannels = currentUser.subscribedChannels;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

// Unsubscribe from channel
function unsubscribeFromChannel(channelId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  if (!currentUser.subscribedChannels) {
    currentUser.subscribedChannels = [];
  }

  currentUser.subscribedChannels = currentUser.subscribedChannels.filter(c => c.id !== channelId);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].subscribedChannels = currentUser.subscribedChannels;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

// Check if subscribed to channel
function isSubscribed(channelId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.subscribedChannels) {
    return false;
  }
  return currentUser.subscribedChannels.some(c => c.id === channelId);
}

// Add to watch history
function addToWatchHistory(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  if (!currentUser.watchHistory) {
    currentUser.watchHistory = [];
  }

  // Remove if already exists (to move to front)
  currentUser.watchHistory = currentUser.watchHistory.filter(v => v.videoId !== videoId);

  // Add to front
  currentUser.watchHistory.unshift({
    videoId,
    watchedAt: new Date().toISOString()
  });

  // Keep only last 100
  currentUser.watchHistory = currentUser.watchHistory.slice(0, 100);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].watchHistory = currentUser.watchHistory;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);
}

// Toggle like video
function toggleLikeVideo(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  if (!currentUser.likedVideos) {
    currentUser.likedVideos = [];
  }

  const index = currentUser.likedVideos.indexOf(videoId);
  const isLiked = index === -1;

  if (isLiked) {
    currentUser.likedVideos.push(videoId);
  } else {
    currentUser.likedVideos.splice(index, 1);
  }

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].likedVideos = currentUser.likedVideos;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true, isLiked };
}

// Check if video is liked
function isVideoLiked(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.likedVideos) {
    return false;
  }
  return currentUser.likedVideos.includes(videoId);
}

// Save video to watch later
function saveVideo(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  if (!currentUser.savedVideos) {
    currentUser.savedVideos = [];
  }

  // Check if already saved
  const existing = currentUser.savedVideos.find(v => v.videoId === videoId);
  if (existing) {
    return { success: true, isSaved: true };
  }

  currentUser.savedVideos.push({
    videoId,
    savedAt: new Date().toISOString(),
    playlist: 'watch-later'
  });

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].savedVideos = currentUser.savedVideos;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true, isSaved: true };
}

// Remove saved video
function unsaveVideo(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.savedVideos) {
    return { success: false };
  }

  currentUser.savedVideos = currentUser.savedVideos.filter(v => v.videoId !== videoId);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].savedVideos = currentUser.savedVideos;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

// Check if video is saved
function isVideoSaved(videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.savedVideos) {
    return false;
  }
  return currentUser.savedVideos.some(v => v.videoId === videoId);
}

// Add notification
function addNotification(notification) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  if (!currentUser.notifications) {
    currentUser.notifications = [];
  }

  const newNotification = {
    id: 'notif_' + Math.random().toString(36).substr(2, 9),
    ...notification,
    createdAt: new Date().toISOString(),
    read: false
  };

  currentUser.notifications.unshift(newNotification);

  // Keep only last 50
  currentUser.notifications = currentUser.notifications.slice(0, 50);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].notifications = currentUser.notifications;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return newNotification;
}

// Mark notification as read
function markNotificationRead(notificationId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.notifications) return;

  const notification = currentUser.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;

    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex].notifications = currentUser.notifications;
      localStorage.setItem('videoshare_users', JSON.stringify(users));
    }
    saveUser(currentUser, true);
  }
}

// Mark all notifications as read
function markAllNotificationsRead() {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.notifications) return;

  currentUser.notifications.forEach(n => n.read = true);

  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].notifications = currentUser.notifications;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);
}

// Get unread notifications count
function getUnreadNotificationsCount() {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.notifications) {
    return 0;
  }
  return currentUser.notifications.filter(n => !n.read).length;
}

// Search history (not requiring login)
function getSearchHistory() {
  try {
    const history = localStorage.getItem('videoshare_search_history');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

function addToSearchHistory(query) {
  if (!query || query.trim().length === 0) return;

  let history = getSearchHistory();

  // Remove if already exists (to move to front)
  history = history.filter(q => q !== query);

  // Add to front
  history.unshift(query);

  // Keep only last 10
  history = history.slice(0, 10);

  localStorage.setItem('videoshare_search_history', JSON.stringify(history));
}

function clearSearchHistory() {
  localStorage.removeItem('videoshare_search_history');
}

// Playlists
function createPlaylist(name, description = '', visibility = 'private') {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  if (!currentUser.playlists) {
    currentUser.playlists = [];
  }

  const newPlaylist = {
    id: 'playlist_' + Math.random().toString(36).substr(2, 9),
    name,
    description,
    visibility,
    videos: [],
    createdAt: new Date().toISOString()
  };

  currentUser.playlists.push(newPlaylist);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].playlists = currentUser.playlists;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true, playlist: newPlaylist };
}

function getPlaylists() {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.playlists) {
    return [];
  }
  return currentUser.playlists;
}

function addToPlaylist(playlistId, videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  const playlist = currentUser.playlists?.find(p => p.id === playlistId);
  if (!playlist) {
    return { success: false, error: 'Playlist not found' };
  }

  // Check if already in playlist
  if (playlist.videos.includes(videoId)) {
    return { success: true };
  }

  playlist.videos.push(videoId);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].playlists = currentUser.playlists;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

function removeFromPlaylist(playlistId, videoId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not logged in' };
  }

  const playlist = currentUser.playlists?.find(p => p.id === playlistId);
  if (!playlist) {
    return { success: false, error: 'Playlist not found' };
  }

  playlist.videos = playlist.videos.filter(v => v !== videoId);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].playlists = currentUser.playlists;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

function deletePlaylist(playlistId) {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.playlists) {
    return { success: false };
  }

  currentUser.playlists = currentUser.playlists.filter(p => p.id !== playlistId);

  // Save
  const users = getUsersFromStorage();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].playlists = currentUser.playlists;
    localStorage.setItem('videoshare_users', JSON.stringify(users));
  }
  saveUser(currentUser, true);

  return { success: true };
}

// Export auth module
window.auth = {
  getCurrentUser,
  register,
  login,
  logout,
  forgotPassword,
  updateProfile,
  subscribeToChannel,
  unsubscribeFromChannel,
  isSubscribed,
  addToWatchHistory,
  toggleLikeVideo,
  isVideoLiked,
  saveVideo,
  unsaveVideo,
  isVideoSaved,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadNotificationsCount,
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
  createPlaylist,
  getPlaylists,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
  DEFAULT_AVATAR
};
