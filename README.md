# Adhikari Builders - Los Santos Rental Division (GTA V RP Website)

![Adhikari Builders Logo Placeholder](https://i.postimg.cc/fyP0xGFk/Adhikari-Builders.png )

Welcome to the official website for Adhikari Builders, Los Santos Rental Division. This is an in-character Grand Theft Auto V Roleplay (GTA V RP) business focused on providing secure, legal, and RP-friendly housing within the city of Los Santos.

Our website is designed to emulate the immersive user interface experience of FiveM NUI or in-game laptop interfaces, ensuring a professional and integrated feel for all players.

## Developer Note

This repository contains the source code for the Adhikari Builders website. Please note that I am the developer of this website and not the owner or operator of the "Adhikari Builders" business. "Adhikari Builders" is a fictional, in-character entity within the Grand Theft Auto V Roleplay (GTA V RP) universe. The website serves as a demonstration and functional portal for this RP business.

## Features

*   **Immersive UI/UX**: Dark theme with gold accents, minimalist design, cards, panels, and subtle animations, inspired by FiveM / GTA NUI aesthetics.
*   **Dynamic Property Blocks**: Browse available housing blocks with key details. Click on a block to view a detailed list of individual properties within a popup modal, including renter status, interior type, income, and storage.
*   **Dynamic Data Management**: All property blocks and tenant details are loaded from `js/data.js`. Data is automatically generated from `renters.csv` via a Node.js script, making it easy to manage large property portfolios.
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

### Property Listings & Data Management
Property block and tenant data is managed via a centralized CSV file to simplify updates.
1.  **`renters.csv`**: Update tenant information, statuses, and property types in this CSV file.
2.  **`update-stats.js`**: Run `node update-stats.js` to automatically parse the CSV, calculate total income/storage, and update `js/data.js`.
3.  **`js/data.js`**: Contains the `propertyBlocks` array which powers the UI. Each block includes calculated fields (`occupiedProperties`, `income`, `cost`, `storage`) and a `properties` array detailing individual units.

### Team Members
Team member information is located in the `teamMembers` array within `js/data.js`. You can update names, roles, phone numbers, and profile images here.

### Discord Invite Link
To change the "Join Discord" button link, open `index.html` and update the `href` attribute of the `<a>` tag with the class `discord-button`.

### Theme Colors
The primary Gold and Black theme (and the light mode alternatives) are defined using CSS variables in `css/style.css`. You can easily adjust `--accent-color`, `--accent-hover`, and other variables in the `:root` and `.light-mode` sections to fine-tune the color scheme.

## Deployment

This project uses Cloudflare Pages via Wrangler for deployment, with automated build scripts defined in `package.json`.

1.  Ensure you have Node.js installed.
2.  Install dependencies: `npm install`
3.  Deploy to Cloudflare: `npm run deploy` (this will automatically build the `dist` folder and deploy it using Wrangler).

## Technologies Used

*   **HTML5 & CSS3**: Structure, styling, and responsiveness.
*   **JavaScript (ES6+)**: Dynamic UI, modal functionality, and data processing.
*   **Node.js**: Backend scripting (`update-stats.js`) to parse CSV data into JSON.
*   **Cloudflare Wrangler**: CLI for automated static site deployment.

## Contact & Support

For in-game inquiries, please visit our office in Los Santos. For Discord support and community engagement, please use the "Join Discord" button on our website.

---
© Adhikari Builders — GTA V RP
