# Practical 8: Update Operation (Unit 5 Prac 3)

## Aim
Develop a Product Management application where the user can select an existing product, edit its details, and update the product information.

## GitHub Repository
`https://github.com/mayuri2907/u5-prac3.git`

## Concepts Implemented
- **Item Selection**: Clicking the "Edit" button populates the form with existing product values and tracks `selectedProductId`.
- **Immutable State Update**: Uses JavaScript `.map()` to update the targeted product record in React state without mutating the original array directly.
- **Controlled Edit Inputs**: Form inputs update temporary edit state in real time and commit changes on submit.
- **Cancel Handler**: Restores default unselected state cleanly.

## How to Run Locally
```bash
npm install
npm run dev
```

## Push to GitHub
```bash
git remote add origin https://github.com/mayuri2907/u5-prac3.git
git branch -M main
git push -u origin main
```
