# ⭐ Party Menu App — React Native CLI 🍽️

A clean and interactive **Party Menu Selection App** built with **React Native CLI** and **React Navigation**. Users can browse dishes by category, search/filter Veg or Non-Veg, add/remove dishes, and view a summary. An ingredient detail screen is available for each dish with mock data.

![React Native](https://img.shields.io/badge/React%20Native-0.74-blue)
![React Navigation](https://img.shields.io/badge/Navigation-React%20Navigation-orange)
![Hooks](https://img.shields.io/badge/React-Hooks-green)
![Platform](https://img.shields.io/badge/Platform-Android-lightgrey)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-ff69b4)


## 📌 Overview

**Party Menu App** demonstrates **UI design + logical thinking** using React Native CLI.

* **Starters, Main Course, Sides, Desserts** organized in tabs
* **Search & Filters**: Find dishes by name, filter Veg/Non-Veg
* **Dish Selection Summary**: Counts per category & total selected dishes
* **Ingredient Details**: Navigate to view dish ingredients (mock JSON)

## ✨ Features

* ✅ **Category Tabs** — Starter, Main Course, Sides, Dessert
* ✅ **Dish Cards** — Name, description, image, add/remove button
* ✅ **Search** — Case-insensitive search within category
* ✅ **Veg / Non-Veg Toggle** — Filter instantly updates results
* ✅ **Selection Summary** — Counts shown on tabs + footer
* ✅ **Ingredient Screen** — Dish name, description, ingredient list
* ✅ **Navigation** — Managed via React Navigation

## 🧰 Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Framework   | React Native CLI                  |
| Language    | JavaScript (ES6+)                 |
| Navigation  | React Navigation                  |
| State Mgmt  | React Hooks (useState, useEffect) |
| Styling     | React Native Stylesheet           |
| Data Source | Mock JSON (dishes + ingredients)  |


## 📁 Folder Structure

```
party-menu-app/
├── src/
│   ├── components/       # UI components (DishCard, Filters, Tabs)
│   ├── screens/          # Screens (DishList, Ingredients)
│   ├── data/             # Mock JSON for dishes & ingredients
│   ├── navigation/       # Stack/Tab navigation setup
│   └── App.js            # Entry point
├── assets/               # Images/icons
├── android/              # Native Android files
├── ios/                  # Native iOS files
├── package.json
└── README.md
```

## ⚙️ Getting Started (Local Dev)

### 1) Prerequisites

* Node.js **v20+**
* JDK 11+ (for Android)
* Android Studio + SDK (set `ANDROID_HOME`)
* Git

### 2) Clone & Install

```bash
git clone https://github.com/Santosh-KumarSahoo/Party-Meny_App.git
cd Party-Meny_App
npm install
```

### 3) Start Metro

```bash
npx react-native start
```

### 4) Run on Android (Windows)

```bash
npx react-native run-android
```

👉 Ensure your device is connected (`adb devices` should list it).

## 📸 Screens

* **Dish Listing**: Categories, search, filters, add/remove
* **Ingredient Details**: Dish description + ingredients

## 📑 Data Source

`src/data/dishes.json`

Each dish includes:

```json
{
  "id": 1,
  "mealType": "MAIN COURSE",
  "type": "VEG",
  "name": "Paneer Butter Masala",
  "description": "Cottage cheese in rich tomato gravy",
  "image": "https://example.com/paneer.png",
  "ingredients": ["Paneer", "Tomato", "Cream", "Butter", "Spices"]
}
```

## 🔐 Environment Setup

* **Android**: Ensure `ANDROID_HOME` and SDK tools are in PATH.
* **Metro**: Runs automatically with `npx react-native start`.
* **Images**: Use mock URLs or local assets in `/assets`.

## 🤝 Contributing

1. Fork repo
2. Create feature branch
3. Commit & push
4. Open PR

## 👨‍💻 Developer

Developed by **Santosh Kumar Sahoo**

🔗 GitHub: [Party-Meny\_App](https://github.com/Santosh-KumarSahoo/Party-Meny_App.git)

