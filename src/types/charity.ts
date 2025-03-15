export interface Charity {
    _id: string; // Unique identifier
    name: string; // Charity name
    profilePicture: string; // Profile picture URL
    coverPicture: string; // Cover picture URL
    createdAt: string; // Creation date (ISO string)
    description: string; // Charity description
    donationEffectCostPer: number; // Cost per donation effect
    donationEffectText: string; // Dynamic text for donation impact
  }
  