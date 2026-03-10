# VideoShare - Video Sharing Platform Specification

## Project Overview

- **Project Name**: VideoShare
- **Project Type**: Single-page web application (SPA-like with vanilla JS)
- **Core Functionality**: A video sharing platform where users can discover, watch, and upload videos with social features
- **Target Users**: Content creators and viewers looking for a modern video sharing experience

---

## UI/UX Specification

### Design Philosophy

Inspired by vintage film reels and cinema aesthetics - warm, cinematic, with subtle motion that feels like classic film. Dark theme with amber/gold accents evoking old movie theaters.

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background Primary | Deep Charcoal | `#0D0D0D` |
| Background Secondary | Warm Black | `#1A1714` |
| Background Tertiary | Dark Brown | `#2A2520` |
| Surface | Warm Gray | `#3A3530` |
| Text Primary | Warm White | `#F5F0E8` |
| Text Secondary | Muted Sand | `#A09890` |
| Text Muted | Dusty Brown | `#6A6560` |
| Accent Primary | Cinema Gold | `#D4A853` |
| Accent Hover | Bright Gold | `#E8C468` |
| Accent Secondary | Rust Orange | `#C75B39` |
| Error | Soft Red | `#D64545` |
| Success | Sage Green | `#5D9C59` |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Logo | Playfair Display | 700 | 28px |
| Headings | DM Sans | 600 | 20-32px |
| Body | DM Sans | 400 | 14-16px |
| Captions | DM Sans | 500 | 12px |
| Buttons | DM Sans | 600 | 14px |

### Spacing System

- Base unit: 4px
- XS: 4px | S: 8px | M: 16px | L: 24px | XL: 32px | XXL: 48px

### Layout Structure

#### Header (64px height)
- Logo (left): "VideoShare" in Playfair Display with film reel icon
- Search bar (center): 480px max-width, pill-shaped with search icon
- Actions (right): Upload button, notification bell, user avatar dropdown
- Background: `#1A1714` with subtle bottom border `#2A2520`

#### Sidebar (240px width, collapsible to 72px)
- Navigation items: Home, Explore, Subscriptions, Library, History, Liked Videos
- Active state: Gold accent bar on left, gold text
- Hover: Background lighten to `#2A2520`
- Icons: Phosphor Icons (thin style)

#### Main Content Area
- Max-width: 1800px, centered
- Padding: 24px
- Responsive grid for video cards

#### Categories Bar (below header)
- Horizontal scrollable chips
- Categories: All, Gaming, Music, Tech, Sports, Cooking, Travel, Comedy, Education
- Active: Gold background, dark text
- Inactive: Surface background, light text

### Video Card Component

- Aspect ratio: 16:9 for thumbnail
- Thumbnail: Rounded corners (12px), subtle zoom on hover (1.02 scale, 200ms)
- Duration badge: Bottom-right of thumbnail, dark overlay with white text
- Avatar: 36px circle, positioned left of title
- Title: 2-line clamp, 15px, semibold
- Channel name: 13px, muted color, hover gold
- Meta: Views • Time ago format (e.g., "1.2M views • 2 days ago")
- Three-dot menu: Top-right corner, appears on hover

### Video Player Page

- Two-column layout (70% player, 30% recommendations)
- Player: 16:9 aspect ratio, rounded corners
- Title: 22px, bold, below player
- Action buttons row: Like, Dislike, Share, Save, More
- Channel row: Avatar (48px), name, subscriber count, Subscribe button
- Description: Expandable, shows view count, upload date, hashtags
- Comments section: Below video with sorting options

### Upload Modal

- Centered modal (800px width)
- Drag-and-drop zone with dashed border
- Video preview after selection
- Form fields: Title, Description, Category dropdown, Tags
- Progress bar during upload simulation

### Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Desktop XL | > 1400px | 4-5 |
| Desktop | 1200-1400px | 4 |
| Tablet | 800-1200px | 3 |
| Mobile | < 800px | 1-2 |

### Animations & Transitions

- Page transitions: Fade in (300ms ease-out)
- Card hover: Scale 1.02, shadow lift (200ms ease)
- Button hover: Background shift (150ms)
- Modal: Fade + scale from 0.95 (250ms ease-out)
- Skeleton loading: Shimmer effect with gradient animation
- Scroll: Smooth scroll behavior

### Visual Effects

- Card shadow: `0 2px 8px rgba(0,0,0,0.3)`, hover: `0 8px 24px rgba(0,0,0,0.4)`
- Search bar: Inner shadow `inset 0 1px 2px rgba(0,0,0,0.2)`
- Video player: Subtle glow effect `0 0 40px rgba(212,168,83,0.1)`
- Category chips: Subtle inner glow when active

---

## Functionality Specification

### Core Features

1. **Home Feed**
   - Display video grid with infinite scroll simulation
   - Category filtering
   - Mock video data (15+ videos)

2. **Video Player**
   - Custom video player controls (play/pause, volume, progress, fullscreen)
   - Auto-play next video suggestion
   - Like/dislike functionality (local state)
   - Share button (copy link simulation)

3. **Search**
   - Real-time search filtering
   - Search by title, channel, description
   - Search history (localStorage)

4. **Upload**
   - Drag and drop file selection
   - Form validation
   - Upload progress simulation
   - Success confirmation

5. **Sidebar Navigation**
   - Collapsible with hamburger menu
   - Active state tracking
   - Smooth collapse animation

6. **User Interactions**
   - Subscribe/unsubscribe (local state)
   - Like videos (with count update)
   - View counts increment

### Mock Data Structure

```javascript
{
  id: string,
  title: string,
  thumbnail: string,
  duration: string,
  views: number,
  uploadedAt: Date,
  channel: {
    id: string,
    name: string,
    avatar: string,
    subscribers: number
  },
  description: string,
  tags: string[],
  category: string,
  likes: number,
  liked: boolean,
  subscribed: boolean
}
```

### Edge Cases

- Empty search results: Show "No videos found" message with illustration
- Long titles: Truncate with ellipsis (2 lines max)
- Failed video load: Show error state with retry button
- Network simulation: Random delay 300-800ms

---

## Technical Implementation

### File Structure

```
/video-share
  /css
    - styles.css
  /js
    - app.js
    - data.js
    - components.js
    - utils.js
  /assets
    - (placeholder images)
  index.html
```

### External Dependencies

- Phosphor Icons (CDN): `https://unpkg.com/@phosphor-icons/web`
- Google Fonts: DM Sans, Playfair Display

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

---

## Acceptance Criteria

### Visual Checkpoints

- [ ] Dark theme with warm gold accents is visible
- [ ] Logo uses Playfair Display font
- [ ] Video cards display in responsive grid
- [ ] Hover effects work on cards (scale, shadow)
- [ ] Category chips scroll horizontally
- [ ] Sidebar collapses smoothly

### Functional Checkpoints

- [ ] Videos play in custom player
- [ ] Search filters videos in real-time
- [ ] Category filtering works
- [ ] Upload modal opens and accepts drag-drop
- [ ] Like/subscribe buttons toggle state
- [ ] Mobile responsive layout works

### Performance

- [ ] Initial load under 3 seconds
- [ ] Smooth animations (60fps)
- [ ] No layout shifts after load
