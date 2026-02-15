# Adhikari Builders - Los Santos Rental Division (GTA V RP Website)

![Adhikari Builders Logo Placeholder]([https://via.placeholder.com/150x50?text=Adhikari+Builders](https://i.postimg.cc/fyP0xGFk/Adhikari-Builders.png))

Welcome to the official website for Adhikari Builders, Los Santos Rental Division. This is an in-character Grand Theft Auto V Roleplay (GTA V RP) business focused on providing secure, legal, and RP-friendly housing within the city of Los Santos.

Our website is designed to emulate the immersive user interface experience of FiveM NUI or in-game laptop interfaces, ensuring a professional and integrated feel for all players.

## Developer Note

This repository contains the source code for the Adhikari Builders website. Please note that I am the developer of this website and not the owner or operator of the "Adhikari Builders" business. "Adhikari Builders" is a fictional, in-character entity within the Grand Theft Auto V Roleplay (GTA V RP) universe. The website serves as a demonstration and functional portal for this RP business.

## Features

*   **Immersive UI/UX**: Dark theme with gold accents, minimalist design, cards, panels, and subtle animations, inspired by FiveM / GTA NUI aesthetics.
*   **Dynamic Property Blocks**: Browse available housing blocks with key details. Click on a block to view a detailed list of individual units within a popup modal, including type, storage capacity, max occupancy, and rent.
*   **Dynamic Data Management**: All property blocks and unit details are loaded from a simple `js/data.js` file, making it easy to update listings without touching the main code.
*   **Day/Night Mode Toggle**: Switch between a dark (default) and a light theme with a convenient toggle in the navigation bar. Your preference is saved locally.
*   **Meet Our Team**: A dedicated section showcasing our professional real estate experts with their roles and contact information.
*   **Rules & Information**: Clear guidelines for tenants to ensure a smooth and RP-compliant housing experience.
*   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
*   **Static Site**: Built purely with HTML, CSS, and JavaScript, ensuring fast performance and easy deployment.

## Getting Started

To view the Adhikari Builders website locally:

1.  **Clone the repository** (if applicable, otherwise download the files).
2.  Navigate to the project directory.
3.  Open the `index.html` file in your preferred web browser.

## Customization

### Property Listings & Units
All property block and unit data can be found and easily modified in `js/data.js`.
*   **`propertyBlocks`**: Each object represents a housing block with `name`, `location`, `image`, and an `units` array.
*   **`units`**: Each object within the `units` array defines a specific unit with `type`, `storage`, `max_capacity`, and `rent`.
*   **`availableUnits`**: Update this field as a string (e.g., "3/12") directly in `js/data.js` for each block to reflect current availability.

### Team Members
Team member information is located in the `teamMembers` array within `js/data.js`. You can update names, roles, phone numbers, and profile images here.

### Discord Invite Link
To change the "Join Discord" button link, open `index.html` and update the `href` attribute of the `<a>` tag with the class `discord-button`.

### Theme Colors
The primary Gold and Black theme (and the light mode alternatives) are defined using CSS variables in `css/style.css`. You can easily adjust `--accent-color`, `--accent-hover`, and other variables in the `:root` and `.light-mode` sections to fine-tune the color scheme.

## Deployment

This website is a static site and can be deployed on any static site hosting service, such as Cloudflare Pages, Netlify, Vercel, or GitHub Pages. Simply upload the entire project folder.

## Technologies Used

*   **HTML5**: Structure and content.
*   **CSS3**: Styling and responsiveness.
*   **JavaScript (ES6+)**: Dynamic content loading, modal functionality, and theme toggling.

## Contact & Support

For in-game inquiries, please visit our office in Los Santos. For Discord support and community engagement, please use the "Join Discord" button on our website.

---
© Adhikari Builders — GTA V RP
