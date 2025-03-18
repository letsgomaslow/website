export type ContentType = 'ai' | 'team' | 'company' | 'contact' | null;

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}