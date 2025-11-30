# 📊 MyAnimeList Stats Card

<div align="center">
  <p><strong>Showcase your anime and manga progress with a dynamic, serverless SVG card.</strong></p>

  <img src="https://mal-stats-card.vercel.app/api/card?user=fknalive&theme=dark" alt="MAL Stats Example" />
  <img src="https://mal-stats-card.vercel.app/api/card?user=fknalive&theme=dark&layout=mini&type=manga" alt="MAL Stats Example" />

  <img src="https://mal-stats-card.vercel.app/api/card?user=fknalive&theme=light&layout=line" alt="MAL Stats Example" />

</div>

## ✨ Features

* **Zero Configuration:** Simply append your username to the URL: `?user=your_nickname`.
* **Adaptive Themes:** Seamlessly matches your aesthetic. Use `&theme=light` or `dark`.
* **Versatile Layouts:** Fits any space. Choose from detailed (`full`), widget-sized (`mini`), or footer-style (`line`).
* **Dual Support:** Tracks both Anime and Manga stats. Just add `&type=manga`.
* **Live Data:** Powered by the [Jikan API](https://jikan.moe/) for up-to-date statistics.

---

## Params Table

<div align="center">

  | Parameter | Options | Default | Description |
  | :--- | :--- | :--- | :--- |
  | `user` | **Required** | - | Your MyAnimeList username. |
  | `type` | `anime`, `manga` | `anime` | Switch between Anime or Manga stats. |
  | `theme` | `dark`, `light` | `dark` | Toggle dark/light mode. |
  | `layout` | `full`, `mini`, `line` | `full` | Changes the layout type. |
  | `width` | `number` | *Auto* | Sets a specific width. |
  | `height` | `number` | *Auto* | Sets a specific height. |

</div>

## Quick Usage

Copy and paste the following markdown into your profile (e.g., GitHub README). Replace `YOUR_USERNAME` with your actual MyAnimeList profile name.

### 1. The Standard Anime Card URL
```markdown
![My Anime Stats](https://mal-stats-card.vercel.app/api/card?user=YOUR_USERNAME)
```

### 2. The Standard Manga Card URL

```markdown
![My Manga Stats](https://mal-stats-card.vercel.app/api/card?user=YOUR_USERNAME&type=manga)
```

##

<p align="center">✨ <em>For any suggestions or questions write in the Issues tab of this Repository</em> ✨</p>