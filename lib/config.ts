// Value from our environment
export const appId = process.env.NEXT_PUBLIC_APP_ID ?? "";
export const token = process.env.NEXT_PUBLIC_TOKEN ?? "";
export const channel = process.env.NEXT_PUBLIC_CHANNEL ?? "";

// AgoraIO uid must be a number, so we use these two constants
export const [OWNER, HOST] = [1, 2];
