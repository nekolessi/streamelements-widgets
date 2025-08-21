# Cyber Corrupted Chat Widget

A neon-cyberpunk Twitch chat overlay with **glitch animations, avatars,
pronouns, hotword highlights, and customizable scanlines**.\
Built for [StreamElements](https://streamelements.com/) overlays, this
widget is optimized for performance while looking like your chat is
straight out of a corrupted VHS terminal.

![screenshot preview]()

------------------------------------------------------------------------

## ✨ Features

-   **Glitch animations**\
    Scrambled usernames + messages that resolve into readable text.
-   **Custom theming**\
    Background, accent colors, and transparency toggle.
-   **Avatars**\
    With provider options (event, [Unavatar](https://unavatar.io/), or
    fallback modes).
-   **Pronoun badges**\
    Pulled from [pronouns.alejo.io](https://pronouns.alejo.io/), with
    caching & rate limiting.
-   **Hotword highlighting**\
    Glow + underline effect for custom keywords.
-   **Scanline effect**\
    Adjustable opacity, optional toggle.
-   **Performance-optimized**\
    Uses fragment insertion, `contain`/`will-change`, and respects
    "reduce motion".

------------------------------------------------------------------------

## 📂 Project Structure

    index.html     # Root container for the widget
    styles.css     # Cyberpunk styling, animations, scanlines
    script.js      # Core logic: events, rendering, scrambling, pronouns, avatars
    fields.json    # StreamElements widget settings & customization controls

------------------------------------------------------------------------

## ⚙️ Installation (StreamElements)

1.  Go to your **StreamElements dashboard → My Overlays**.
2.  Create a new overlay (or edit an existing one).
3.  Add a new **Custom Widget**.
4.  Paste the contents of each file into the corresponding tab:
    -   **HTML** → `index.html`
    -   **CSS** → `styles.css`
    -   **JS** → `script.js`
    -   **Fields** → `fields.json`
5.  Save, preview, and position the widget in your overlay.

------------------------------------------------------------------------

## 🛠️ Customization

All customization options appear in the **Fields tab** inside
StreamElements. Key options include:

-   **Messages**
    -   Max messages on screen\
    -   Message lifetime (auto-remove delay)\
    -   Scramble duration & charset\
-   **Style**
    -   Colors (background, accents, username, message)\
    -   Transparent background toggle\
    -   Reduce motion toggle\
    -   Scanlines toggle + opacity\
-   **Avatars**
    -   Show/hide\
    -   Size, glow, shape (circle or hex)\
    -   Provider selection (auto / event / Unavatar)\
    -   Fallback (letter, hide, custom URL)\
-   **Pronouns**
    -   Enable/disable\
    -   Position (before or after username)\
    -   Color, unknown mode, custom unknown text\
    -   API fetch rate limit\
-   **Hotwords**
    -   Custom word list (comma-separated)\
    -   Highlight color & glow

------------------------------------------------------------------------

## 🔮 Example System Messages

The widget can also stylize non-chat events like subs, tips, and raids.\
They appear as **\[SYSTEM BREACH\]** messages with glitch effects.

------------------------------------------------------------------------

## 📜 License

MIT License -- feel free to fork, remix, and use in your own streams.\
Attribution is appreciated but not required.
