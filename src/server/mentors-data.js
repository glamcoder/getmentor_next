import { getMentors as getCachedMentors } from './cached-mentors'
import {
  getMentors as getUncachedMentors,
  getMentorById as getUncachedMentorById,
  getMentorBySlug as getUncachedMentorBySlug,
} from './airtable-mentors'

export async function getAllMentors(all_fields, show_hidden, useCache = true) {
  const getMentors = useCache ? getCachedMentors : getUncachedMentors

  const allMentors = (await getMentors()).filter((mentor) => mentor.isVisible)

  const filteredMentors = show_hidden ? allMentors.filter((mentor) => mentor.isVisible) : allMentors

  if (all_fields) {
    return filteredMentors
  } else {
    const mentors = filteredMentors.map((m) => {
      return {
        id: m.id,
        slug: m.slug,
        name: m.name,
        job: m.job,
        workplace: m.workplace,
        experience: m.experience,
        price: m.price,
        menteeCount: m.menteeCount,
        photo: m.photo,
        photo_url: m.photo_url,
        sortOrder: m.sortOrder,
        tags: m.tags,
        sponsors: m.sponsors,
      }
    })

    return mentors
  }
}

export async function getOneMentorBySlug(slug, useCache = true) {
  if (!useCache) {
    return await getUncachedMentorBySlug(slug)
  }

  const allMentors = await getCachedMentors()
  return allMentors.find((mentor) => mentor.slug === slug)
}

export async function getOneMentorById(id, useCache = true) {
  if (!useCache) {
    return await getUncachedMentorById(id)
  }

  const allMentors = await getCachedMentors()
  return allMentors.find((mentor) => mentor.id === id)
}
