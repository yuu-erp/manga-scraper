import { MediaArgs } from './anilist'

/**
 * Represents a base unit for media entities, containing common fields.
 */
export type MediaUnit = {
  name: string // Name of the media unit (e.g., chapter or episode title)
  sourceId: string // Unique identifier of the source (e.g., MangaDex, AniList)
  sourceMediaId: string // Identifier of the media in the source
  slug: string // URL-friendly identifier for the media unit
  sourceLinkId: string // Identifier for the connection to the source
  published?: boolean // Whether the media unit is published
  section?: string // Optional section or category (e.g., volume, arc)
}

/**
 * Represents a chapter in a manga, extending MediaUnit with chapter-specific data.
 */
export interface Chapter extends MediaUnit {
  sourceChapterId: string // Unique identifier of the chapter in the source
}

/**
 * Represents a connection between a manga and its source.
 */
export interface SourceMediaConnection {
  id: string // Unique identifier for the connection
  mediaId: number // Anilist media ID
  sourceMediaId: string // Identifier of the manga in the source
  sourceId: string // Identifier of the source
}

/**
 * Represents a source (e.g., MangaDex, custom source).
 */
export interface Source {
  id: string // Unique identifier for the source
  name: string // Name of the source
  isCustomSource: boolean // Whether the source is custom or third-party
}

/**
 * Represents a chapter in a source manga.
 */
export interface SourceChapter {
  name: string // Name of the chapter
  sourceChapterId: string // Unique identifier of the chapter in the source
  sourceMangaId: string // Identifier of the manga in the source
  section?: string // Optional section (e.g., volume or arc)
}

/**
 * Represents a manga in a source, including its chapters and metadata.
 */
export interface SourceManga {
  title: [string, ...string[]] // Array of titles, ensuring at least one title
  chapters: SourceChapter[] // List of chapters in the manga
  sourceId: string // Identifier of the source
  sourceMangaId: string // Identifier of the manga in the source
  anilistId?: number // Optional Anilist media ID
  metadata?: MediaArgs // Optional metadata from Anilist
}

/**
 * Represents a manga with its chapters and source connection.
 */
export interface Manga {
  anilistId: number // Anilist media ID
  chapters: Chapter[] // List of chapters in the manga
  sourceMangaConnection: SourceMediaConnection & { mediaId: Manga['anilistId'] } // Ràng buộc mediaId khớp với anilistId
}