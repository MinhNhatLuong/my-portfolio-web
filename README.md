# 🎨 My Personal Portfolio (Frontend)

A modern, high-performance personal portfolio website built with **Next.js 16**, designed to showcase software engineering projects and photography galleries seamlessly.

![Project Preview](./public/preview.jpg)
*(Note: Please add a screenshot of your website here and name it preview.jpg)*

**Frontend for:** [My Portfolio CMS](https://github.com/MinhNhatLuong/my-portfolio-cms)

## ✨ Key Features

- **Dual Identity:** Specialized sections for both "Software Engineer" and "Photographer".
- **Dynamic Content:** Fetches real-time data from Sanity CMS.
- **Google Drive Gallery:** Directly integrates with Google Drive API to display high-quality photo albums without third-party hosting costs.
- **Internationalization (i18n):** Native support for English (EN), Vietnamese (VI), and Japanese (JA).
- **Theme System:** Dark/Light mode with a unique circular reveal transition effect.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop using Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion (Animations)
- **Icons:** Lucide React & React Icons
- **Data Fetching:** Sanity Client (GROQ), Google Drive API
- **State Management:** React Context (Theme & Language)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/MinhNhatLuong/my-portfolio-web.git

# Navigate to the project directory
cd my-portfolio-web

# Install dependencies
npm install
```

### 3. Environment Variables (Crucial)

Create a `.env.local` file in the root directory and configure the following keys:

```env
# --- SANITY CMS CONFIGURATION ---
# Found in your Sanity Manage dashboard (https://www.sanity.io/manage)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-10

# --- GOOGLE DRIVE API (For Gallery) ---
# 1. Go to Google Cloud Console.
# 2. Enable "Google Drive API".
# 3. Create an API Key.
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # API clients (Sanity, Drive)
│   ├── types/            # TypeScript interfaces
│   ├── context/          # Global state (Theme, Language)
│   └── constants/        # Text translations & static options
└── public/               # Static assets
```

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add the **Environment Variables** (from step 3) in Vercel Project Settings.
4. Click **Deploy**.

## 🔗 Use with CMS

This frontend is designed to work with the accompanying Sanity Studio:
👉 **Backend/CMS Repo:** [My Portfolio CMS](https://github.com/MinhNhatLuong/my-portfolio-cms)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
