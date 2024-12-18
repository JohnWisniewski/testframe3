import featureFlags from '../../featureFlags.json';

// Rename the interface to avoid conflict with the variable name
interface FeatureFlagsType {
  [key: string]: boolean;  // Assuming all flags are boolean values
}

// Type the imported JSON explicitly
const typedFeatureFlags: FeatureFlagsType = featureFlags as FeatureFlagsType;

export const isFeatureEnabled = (feature: string): boolean => {
  if (typedFeatureFlags.hasOwnProperty(feature)) {
    return typedFeatureFlags[feature];
  }

  console.warn(`Feature flag "${feature}" not found.`);
  return false; // Default to false for undefined flags
};
