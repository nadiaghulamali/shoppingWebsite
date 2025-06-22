# Shopping Website Automation Suite

This repository contains UI and API automation tests for the sample e-commerce website

## 🧪 Automation Tech Stack

- Playwright (TypeScript)
- Page Object Model structure
- `.env` for base URLs and element locators
- Postman (for API testing)
- HTML reporting (via Playwright built-in reporters)


## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nadiaghulamali/shoppingWebsite.git
cd shoppingWebsite
npm install
npx playwright test
npx playwright test

Test Scenarios Covered
✅ UI Automation
Test Case A: Registration flow with login validation

Test Case B: Place order with multiple products and verify price calculations

Test Case C: Add products to wishlist and checkout from wishlist

Test Case D: Search products and validate results

✅ API Automation (Postman)
POST  — Create a new pet

GET — Retrieve pet details
Collection is available inside the postman/ directory.

📄 Manual Test Cases
Five well-designed manual test cases are included in the manual-tests/ folder.
Format: .docx file covering website functionalities.

✅ Performance Scenarios




