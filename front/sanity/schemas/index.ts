import { experienceItem } from "./documents/experienceItem"
import { metric } from "./documents/metric"
import { post } from "./documents/post"
import { profile } from "./documents/profile"
import { project } from "./documents/project"
import { siteSettings } from "./documents/siteSettings"
import { skillGroup } from "./documents/skillGroup"
import { socialLink } from "./documents/socialLink"
import { localizedString } from "./objects/localizedString"
import { localizedStringArray } from "./objects/localizedStringArray"
import { localizedText } from "./objects/localizedText"
import { seo } from "./objects/seo"

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedStringArray,
  seo,
  siteSettings,
  profile,
  socialLink,
  project,
  post,
  skillGroup,
  experienceItem,
  metric,
]
