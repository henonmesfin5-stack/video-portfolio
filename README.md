# Video Editor Portfolio

Plain HTML, CSS and JavaScript. No installs, no build step, no backend.

## Folder structure
```
video-portfolio/
├── index.html      <- page content (text, sections, your email/links)
├── css/style.css   <- how it looks (colors and fonts are at the top)
├── js/videos.js    <- YOUR YOUTUBE VIDEOS (edit this most often)
├── js/main.js      <- behavior: video popup, timeline bar, scroll fade-ins
├── images/         <- put profile.jpg here
└── README.md       <- this guide
```

## 1. Set up VS Code
1. Download and install VS Code: https://code.visualstudio.com
2. Download Git: https://git-scm.com/downloads (accept all defaults).
3. In VS Code: File > Open Folder > choose `video-portfolio`.
4. Open the Extensions icon (left bar), search **Live Server** (by Ritwick Dey), click Install.

## 2. Run locally
Open `index.html`, right-click inside it, choose **Open with Live Server**. The site opens in your browser and refreshes every time you save.

## 3. Put it on GitHub
1. Make a free account at https://github.com
2. Click **+** > **New repository**. Name it `video-portfolio`, keep it Public, do NOT tick any "add README" boxes, click Create.
3. In VS Code open the terminal (Terminal > New Terminal) and run these one at a time:
```
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/video-portfolio.git
git push -u origin main
```
(Replace YOUR-USERNAME. A browser window may ask you to sign in to GitHub the first time.)

## 4. Deploy on Vercel (free)
1. Go to https://vercel.com/signup and choose **Continue with GitHub**.
2. Click **Add New > Project**, find `video-portfolio`, click **Import**.
3. Leave every setting as is (Framework: Other) and click **Deploy**.
4. After about 30 seconds you get a link like `video-portfolio.vercel.app`. That is your website.
5. To pick a nicer name: Project > Settings > Domains > edit the vercel.app name.

## 5. Add your YouTube videos
1. Open your video on YouTube. The link looks like `https://www.youtube.com/watch?v=dQw4w9WgXcQ`.
2. The ID is what follows `v=` (here `dQw4w9WgXcQ`). For `youtu.be/ABC123` it is `ABC123`.
3. Open `js/videos.js`, replace `PASTE_VIDEO_ID_1` with the ID, change the title and category. Repeat for each video.
4. Videos must be Public or Unlisted on YouTube, and embedding must be allowed.
5. Thumbnails load automatically from YouTube.

## 6. Common changes
- **Text:** open `index.html`, find the words, change them. Comments marked `EDIT` show the key places.
- **Your name:** search for "Your Name" (Ctrl+F) and replace it everywhere.
- **Email and social links:** the Contact section in `index.html`.
- **Photo:** save a photo as `images/profile.jpg` (replace the old file). Without one, the photo area simply hides.
- **Colors:** top of `css/style.css`, the `:root` block. Change the hex codes (e.g. `--accent`).
- **Fonts:** pick one at fonts.google.com, update the `<link>` in `index.html` and `--display`/`--body` in `style.css`.
- **Add/remove a video:** copy or delete one `{ ... },` line in `js/videos.js`.
- **Light/dark mode:** the moon/sun button. Visitors get their device's mode first; their choice is remembered. Dark colors are in `[data-theme="dark"]` at the top of `style.css`.
- **Stats numbers:** in `index.html` change `data-count="150"` (and the label under it).
- **Experience:** copy or delete an `<article class="job reveal">` block.
- **Filter buttons:** made automatically from the `category` words in `js/videos.js` (use the same spelling for videos in one group).
- **Open-for-work badge:** the `.pill` line in `index.html`. Delete it if you are not available.
- **Background dots:** section 7 of `js/main.js`; change `110` to use fewer or more, or delete that section to remove them.
- **Add a service:** copy one `<div class="service reveal">...</div>` block in `index.html`.
- **Remove a section:** delete everything from its `<section ...>` to `</section>` and its link in the nav.

## 7. Publish changes
After editing and saving, run in the terminal:
```
git add .
git commit -m "Describe your change"
git push
```
Vercel updates your live site automatically within a minute.

## What the code does
- **index.html** is the skeleton: nav, hero, work, services, about, contact, and an empty video popup.
- **style.css** styles it. `.reveal` elements start invisible and fade in; `.cut` is the hero text animation; the media query at the bottom handles tablet and phone.
- **videos.js** is just a list of your videos.
- **main.js** also handles light/dark mode, the phone menu, category filters, number count-up, word-by-word text and the drifting background dots. It reads that list and builds the cards, opens YouTube in a popup, moves the editor-style timeline bar as you scroll, and triggers the fade-ins.
