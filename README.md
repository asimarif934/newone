# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d258fe72-390b-4c13-868e-06785ec70145

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d258fe72-390b-4c13-868e-06785ec70145) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Features

### Checkout Page
A luxury checkout page with the following features:

- **Customer Details Form**: Full name, email, phone numbers, and shipping address
- **Delivery Information**: Fixed delivery charges (Rs. 200) with 2-day delivery
- **Coupon System**: Apply discount codes (LUXURY20, BEAUTY15, WELCOME10)
- **Order Summary**: Real-time calculation of subtotal, delivery charges, discounts, and grand total
- **Luxury Design**: Consistent with the brand's premium aesthetic using gradients, shadows, and animations
- **Responsive Layout**: Two-column grid layout (form on left, order summary on right)
- **Form Validation**: Required field validation and proper input types
- **Security Notice**: Payment security indicator
- **Product Integration**: Automatically reads product details from navigation state when coming from product pages

Access the checkout page at `/checkout` route.

### Product Page Enhancements
Enhanced product pages with:

- **Buy Now Button**: Direct navigation to checkout with product details (id, name, price, quantity)
- **WhatsApp Chat**: Luxury-styled WhatsApp chat button that opens customer support
- **Quantity Selection**: Interactive quantity selector with real-time price updates
- **Luxury Styling**: Consistent premium design with hover effects and animations

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d258fe72-390b-4c13-868e-06785ec70145) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
