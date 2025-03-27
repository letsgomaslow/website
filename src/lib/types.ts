export type ContentType = 'ai' | 'team' | 'company' | 'contact' | 'blog' | 'capabilities' | 'enterprise' | 'cost' | 'risk' | 'byoai' | null;

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}


// export type ContentType = 'ai' | 'team' | 'company' | 'contact' | null;

// export interface TeamMember {
//   name: string;
//   role: string;
//   bio: string;
//   imageUrl: string;
// }