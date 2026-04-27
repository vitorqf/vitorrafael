import "server-only"
import { createClient } from "next-sanity"
import {
  hasSanityConfig,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "@/lib/sanity/env"

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published",
      stega: false,
    })
  : null

export const sanityPreviewClient =
  hasSanityConfig && sanityReadToken
    ? createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        useCdn: false,
        token: sanityReadToken,
        perspective: "previewDrafts",
        stega: false,
      })
    : null
