// Authentication and popup management utilities

export const checkUserSignupStatus = (): boolean => {
  return localStorage.getItem("userSignedUp") === "true";
};

export const markUserAsSignedUp = (): void => {
  localStorage.setItem("userSignedUp", "true");
};

export const clearUserSignupStatus = (): void => {
  localStorage.removeItem("userSignedUp");
};

// Function to check if popup should be shown (for future discount campaigns)
export const shouldShowAuthPopup = (): boolean => {
  return !checkUserSignupStatus();
};

// Function to trigger popup for discount campaigns
export const triggerDiscountPopup = (): boolean => {
  return shouldShowAuthPopup();
};
