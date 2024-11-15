type UserPreferencesType = {
  enable2FA: boolean;
  emailNotification: boolean;
  _id: string;
};

interface UserType {
  _id: string;
  name: string;
  email: string;
  userPreferences: UserPreferencesType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type LoginType = {
  message: string;
  mfaRequired: boolean;
  user: UserType | null;
};

type VerifyMFAType = {
  message: string;
  userPreferences: {
    enable2FA: boolean;
  };
};
