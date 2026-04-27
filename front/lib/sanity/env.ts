const fallbackApiVersion = "2026-04-25"

export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? fallbackApiVersion
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN

export const hasSanityConfig = Boolean(sanityProjectId && sanityDataset)
